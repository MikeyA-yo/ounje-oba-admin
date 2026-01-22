"use server";

import { createClient } from "@/utils/supabase/server";

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
}: {
    page?: number;
    pageSize?: number;
}) {
    // Assuming 'orders' table acts as transactions for now, or use 'transactions' table if exists.
    // Checking previous context, user didn't mention specific transactions table, so we fallback to orders or check.
    // Let's assume 'orders' for now as the user mentioned "Transactions List" in task.md which often mirrors orders.
    // However, I'll check if 'transactions' table exists by trying to select from it.

    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Try fetching from orders as transactions
    const { data, count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching transactions:", error);
        return { results: [], count: 0 };
    }

    // Map orders to transaction shape
    const results = data.map(order => {
        // const dateObj = new Date(order.created_at); // Unused
        return {
            transactionId: order.id.slice(0, 8).toUpperCase(), // Shorten ID for display
            customer: order.customer_name || "Unknown",
            date: order.created_at, // Keep ISO string for easy parsing if needed, but columns expect separate date/time or handled by cell.
            // Actually columns accessorFn uses `t.date` and `t.time`.
            // Let's split them.
            time: order.created_at, // The column component parses ISO string just fine
            amount: `₦${parseFloat(String(order.total_amount || "0").replace(/[^0-9.-]+/g, "")).toLocaleString()}`,
            paymentType: order.payment_method || "N/A", // payment_method might not be selected in query, need to verify
            status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // Capitalize
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

export async function getReportStats() {
    // Re-using logic from getDashboardStats but formatting for ReportCards
    const { ordersCount, usersCount, totalRevenue } = await getDashboardStats();

    // Mock growth for now
    return {
        totalRevenue: { value: totalRevenue, growth: 12 },
        totalOrders: { value: ordersCount, growth: 5 },
        totalCustomers: { value: usersCount, growth: 8 },
        newCustomers: { value: Math.floor(usersCount * 0.1), growth: 2 }, // Mock new customers as 10% of total
    };
}

export async function getRevenueData({ from, to }: { from?: Date; to?: Date } = {}) {
    // Mock data for revenue trend
    // Real implementation would aggregate orders by date

    // In a real app we would filter query by from/to
    // const query = supabase.from('orders')...
    // if (from) query.gte('created_at', from.toISOString())
    // if (to) query.lte('created_at', to.toISOString())

    return [
        { day: "Mon", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Tue", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Wed", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Thu", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Fri", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Sat", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
        { day: "Sun", grossRevenue: Math.floor(Math.random() * 5000) + 1000, netRevenue: Math.floor(Math.random() * 4000) + 800 },
    ];
}

export async function getCustomerGrowthData() {
    // Mock data for customer growth
    return [
        { day: 1, customers: 120 },
        { day: 5, customers: 135 },
        { day: 10, customers: 150 },
        { day: 15, customers: 180 },
        { day: 20, customers: 220 },
        { day: 25, customers: 250 },
        { day: 30, customers: 300 },
    ];
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
