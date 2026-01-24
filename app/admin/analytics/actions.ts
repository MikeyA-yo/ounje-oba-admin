"use server";

import { createClient } from "@/utils/supabase/server";
import { eachDayOfInterval, format, subDays, startOfDay, endOfDay } from "date-fns";

export async function getDashboardStats() {
    const supabase = await createClient();

    // Fetch counts
    const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    // Calculate roughly. Real impl would sum up 'total_amount' from orders
    const { data: orders } = await supabase
        .from("orders")
        .select("total_amount");

    const totalRevenue = orders?.reduce((acc, order) => {
        const amount = parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(amount) ? 0 : amount);
    }, 0) || 0;

    return {
        productsCount: productsCount || 0,
        ordersCount: ordersCount || 0,
        usersCount: usersCount || 0,
        totalRevenue,
    };
}

export async function getTransactions({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "date_desc",
    dateRange,
}: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    dateRange?: { from: Date; to: Date };
}) {
    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Use orders as transactions
    let query = supabase
        .from("orders")
        .select("*", { count: "exact" })
        .range(from, to);

    if (search) {
        query = query.or(`order_number.ilike.%${search}%,customer_name.ilike.%${search}%,id.ilike.%${search}%`);
    }

    if (dateRange?.from) {
        query = query.gte("created_at", dateRange.from.toISOString());
    }

    if (dateRange?.to) {
        const endOfDay = new Date(dateRange.to);
        endOfDay.setHours(23, 59, 59, 999);
        query = query.lte("created_at", endOfDay.toISOString());
    }

    switch (sortBy) {
        case "date_asc":
            query = query.order("created_at", { ascending: true });
            break;
        case "date_desc":
            query = query.order("created_at", { ascending: false });
            break;
        case "amount_asc":
            query = query.order("total_amount", { ascending: true });
            break;
        case "amount_desc":
            query = query.order("total_amount", { ascending: false });
            break;
        case "status":
            query = query.order("status", { ascending: true });
            break;
        default:
            query = query.order("created_at", { ascending: false });
            break;
    }

    const { data, count, error } = await query;

    if (error) {
        console.error("Error fetching transactions:", error);
        return { results: [], count: 0 };
    }

    // Map orders to transaction shape
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = data.map((order: any) => {
        return {
            id: order.id, // Use string ID (uuid)
            transactionId: (order.order_number || order.id.slice(0, 8)).toUpperCase(),
            customer: order.customer_name || "Unknown",
            date: order.created_at,
            time: order.created_at,
            amount: `₦${parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, "")).toLocaleString()}`,
            paymentType: order.payment_method || "N/A",
            status: (order.status || "Pending").charAt(0).toUpperCase() + (order.status || "Pending").slice(1),
        };
    });

    return {
        results,
        count: count || 0,
    };
}

export async function getLowStockCount() {
    const supabase = await createClient();

    // Since we can't easily compare columns (stock_quantity <= low_stock_alert) in simple filters without checking if Supabase supports it directly
    // Supabase JS filter .lte('stock_quantity', 'low_stock_alert') compares column to value, not column to column usually.
    // However, we can use .rpc() if we had a function, or just fetch all and filter JS side (not efficient but checking dataset size).
    // Better approach: Use raw SQL or assume valid comparison if supported.
    // Or we can just count products with stock_quantity <= a common threshold if column comparison fails.
    // Let's try raw rpc or just fetch active products and filter. 
    // Actually, Supabase postgrest-js doesn't support col-to-col comparison in filter builders easily.
    // Let's fetch products and count for now (assuming not huge catalog).

    const { data: products } = await supabase
        .from("products")
        .select("stock_quantity, low_stock_alert");

    if (!products) return 0;

    const count = products.filter(p => {
        const stock = parseInt(p.stock_quantity);
        const alert = parseInt(p.low_stock_alert);
        return !isNaN(stock) && !isNaN(alert) && stock <= alert;
    }).length;

    return count;
}

export async function getTopCustomers() {
    // This is tricky without a direct aggregation on orders.
    // We want customers with highest total spent.
    // We will fetch orders, group by user_id/email, and sum total. (JS aggregation for now)

    const supabase = await createClient();
    const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, customer_name, user_id, items:order_items(*)")
        .order("created_at", { ascending: false });

    // Assuming we don't have user_id on some mock orders, we use customer_name or fallback.
    // Real implementation should group by user_id.

    const customerMap = new Map<string, { name: string, spent: number, purchases: number }>();

    orders?.forEach(order => {
        const key = order.customer_name || "Unknown";
        const amount = parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, ""));

        if (!customerMap.has(key)) {
            customerMap.set(key, { name: key, spent: 0, purchases: 0 });
        }

        const current = customerMap.get(key)!;
        current.spent += isNaN(amount) ? 0 : amount;
        current.purchases += 1;
    });

    const sorted = Array.from(customerMap.values())
        .sort((a, b) => b.spent - a.spent)
        .slice(0, 5);

    return sorted.map(c => ({
        text: c.name,
        subtext: `${c.purchases} Purchase${c.purchases !== 1 ? 's' : ''}`,
        price: `₦${c.spent.toLocaleString()}`
    }));
}

export async function getTransactionStats() {
    const supabase = await createClient();
    const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, status");

    let totalCount = 0;
    let totalAmount = 0;
    let pendingCount = 0;
    let pendingAmount = 0;
    let refundedCount = 0;
    let refundedAmount = 0;
    let paidCount = 0;
    let paidAmount = 0;

    orders?.forEach(order => {
        const amount = parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, ""));
        const validAmount = isNaN(amount) ? 0 : amount;

        totalCount++;
        totalAmount += validAmount;

        const status = (order.status || "").toLowerCase();

        if (status === "pending") {
            pendingCount++;
            pendingAmount += validAmount;
        } else if (status === "refunded") {
            refundedCount++;
            refundedAmount += validAmount;
        } else if (status === "paid" || status === "completed" || status === "delivered") {
            // Assuming completed/delivered also means paid/revenue for now
            paidCount++;
            paidAmount += validAmount;
        }
    });

    return {
        totalCount,
        totalAmount,
        pendingCount,
        pendingAmount,
        refundedCount,
        refundedAmount,
        paidCount,
        paidAmount
    };
}

export async function getReportStats({ from, to }: { from?: Date; to?: Date } = {}) {
    const supabase = await createClient();

    // Define periods: Current vs Previous (same duration)
    const currentEnd = to || new Date();
    const currentStart = from || subDays(currentEnd, 30);
    const duration = currentEnd.getTime() - currentStart.getTime();

    const previousEnd = new Date(currentStart.getTime()); // Previous ends where current starts
    const previousStart = new Date(previousEnd.getTime() - duration);

    // Helper to get counts and sum for a period
    async function getPeriodStats(start: Date, end: Date) {
        const startStr = start.toISOString();
        const endStr = end.toISOString();

        const { count: ordersCount } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .gte("created_at", startStr)
            .lte("created_at", endStr);

        const { count: usersCount } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .gte("created_at", startStr)
            .lte("created_at", endStr);

        const { data: revenueOrders } = await supabase
            .from("orders")
            .select("total_amount, status")
            .gte("created_at", startStr)
            .lte("created_at", endStr);

        let revenue = 0;
        revenueOrders?.forEach(o => {
            const status = (o.status || "").toLowerCase();
            if (["paid", "completed", "delivered"].includes(status)) {
                const amount = parseFloat(String(o.total_amount || "0").replace(/[^0-9.-]+/g, ""));
                revenue += isNaN(amount) ? 0 : amount;
            }
        });

        return {
            orders: ordersCount || 0,
            users: usersCount || 0,
            revenue
        };
    }

    const current = await getPeriodStats(currentStart, currentEnd);
    const previous = await getPeriodStats(previousStart, previousEnd);

    const calculateGrowth = (curr: number, prev: number) => {
        if (prev === 0) return curr > 0 ? 100 : 0;
        return Math.round(((curr - prev) / prev) * 100);
    };

    // Get total customers (all time) for the display value, but growth is based on recent trend
    const { count: totalCustomers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    // Get total orders (all time)
    const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    // Get total revenue (all time)
    const { data: allOrders } = await supabase.from("orders").select("total_amount, status");
    let totalRevenue = 0;
    allOrders?.forEach(o => {
        const status = (o.status || "").toLowerCase();
        if (["paid", "completed", "delivered"].includes(status)) {
            const amount = parseFloat(String(o.total_amount || "0").replace(/[^0-9.-]+/g, ""));
            totalRevenue += isNaN(amount) ? 0 : amount;
        }
    });


    return {
        totalRevenue: {
            value: totalRevenue,
            growth: calculateGrowth(current.revenue, previous.revenue)
        },
        totalOrders: {
            value: totalOrders || 0,
            growth: calculateGrowth(current.orders, previous.orders)
        },
        totalCustomers: {
            value: totalCustomers || 0,
            growth: calculateGrowth(current.users, previous.users)
        },
        newCustomers: {
            value: current.users,
            growth: calculateGrowth(current.users, previous.users)
        },
    };
}

export async function getRevenueData({ from, to }: { from?: Date; to?: Date } = {}) {
    const supabase = await createClient();

    const endDate = to || new Date();
    const startDate = from || subDays(endDate, 7);

    // Fetch orders within range
    const { data: orders, error } = await supabase
        .from("orders")
        .select("created_at, total_amount, status")
        .gte("created_at", startOfDay(startDate).toISOString())
        .lte("created_at", endOfDay(endDate).toISOString());

    if (error) {
        console.error("Error fetching revenue data:", error);
        return [];
    }

    const revenueByDate = new Map<string, number>();

    orders?.forEach((order) => {
        const status = (order.status || "").toLowerCase();
        // Assuming 'paid', 'completed', 'delivered' count as revenue
        if (["paid", "completed", "delivered"].includes(status)) {
            const amount = parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, ""));
            const validAmount = isNaN(amount) ? 0 : amount;
            const dayKey = format(new Date(order.created_at), "yyyy-MM-dd");

            revenueByDate.set(dayKey, (revenueByDate.get(dayKey) || 0) + validAmount);
        }
    });

    // Generate all days in interval to ensure continuous line
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
        const dayKey = format(day, "yyyy-MM-dd");
        const grossRevenue = revenueByDate.get(dayKey) || 0;

        // Mocking Net Revenue as 75% of Gross for visual trend, as real cost data calculation depends on deeper joins
        const netRevenue = Math.floor(grossRevenue * 0.75);

        return {
            day: format(day, "MMM dd"),
            grossRevenue,
            netRevenue
        };
    });
}

export async function getCustomerGrowthData({ from, to }: { from?: Date; to?: Date } = {}) {
    const supabase = await createClient();

    // Default to last 30 days if no range specified
    const end = to || new Date();
    const start = from || subDays(end, 30);

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("created_at")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching customer growth:", error);
        return [];
    }

    // const growthMap = new Map<string, number>();

    // Initialize map with running total if we wanted cumulative, but usually "Growth" chart shows new users per day or cumulative.
    // The provided image shows a line going up, implying cumulative count.

    // To do cumulative properly, we need the count BEFORE the start date.
    const { count: previousCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .lt("created_at", start.toISOString());

    let runningTotal = previousCount || 0;

    // Group new profiles by day
    const dailyNewUsers = new Map<string, number>();
    profiles?.forEach(p => {
        const dayKey = format(new Date(p.created_at), "yyyy-MM-dd");
        dailyNewUsers.set(dayKey, (dailyNewUsers.get(dayKey) || 0) + 1);
    });

    const days = eachDayOfInterval({ start, end });

    return days.map(day => {
        const dayKey = format(day, "yyyy-MM-dd");
        const newUsers = dailyNewUsers.get(dayKey) || 0;
        runningTotal += newUsers;

        return {
            day: format(day, "MMM dd"), // or just day number if that's what chart expects, but date is better
            // component expects 'day' and 'customers'
            customers: runningTotal
        };
    });
}

export async function getPaymentMethodStats() {
    const supabase = await createClient();
    const { data: orders } = await supabase.from("orders").select("payment_method");

    const stats: Record<string, number> = {};
    const total = orders?.length || 0;

    orders?.forEach(o => {
        const method = o.payment_method || "Unknown";
        stats[method] = (stats[method] || 0) + 1;
    });

    return Object.entries(stats).map(([method, count]) => ({
        method,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        count
    }));
}

export async function getOrdersStatusStats() {
    const supabase = await createClient();
    const { data: orders } = await supabase.from("orders").select("status");

    const stats: Record<string, number> = {};
    // const total = orders?.length || 0; // Unused

    orders?.forEach(o => {
        const status = o.status || "Unknown";
        // Normalize status
        const key = status.charAt(0).toUpperCase() + status.slice(1);
        stats[key] = (stats[key] || 0) + 1;
    });

    const COLORS = ["#24A148", "#F1C21B", "#1D55CE", "#FF0000", "#808080"];

    return Object.entries(stats).map(([status, amount], index) => ({
        status,
        amount, // "amount" here is count based on chart usage
        value: amount, // Keeping value for consistency
        color: COLORS[index % COLORS.length]
    }));
}
