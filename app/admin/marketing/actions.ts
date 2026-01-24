"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCoupons({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "created_at_desc",
    status = "",
}: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    status?: string;
}) {
    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("coupons")
        .select("*", { count: "exact" })
        .range(from, to);

    // Sorting
    switch (sortBy) {
        case "created_at_desc":
            query = query.order("created_at", { ascending: false });
            break;
        case "created_at_asc":
            query = query.order("created_at", { ascending: true });
            break;
        case "value_desc":
            query = query.order("discount_value", { ascending: false });
            break;
        case "value_asc":
            query = query.order("discount_value", { ascending: true });
            break;
        default:
            query = query.order("created_at", { ascending: false });
    }

    if (search) {
        query = query.ilike("code", `%${search}%`);
    }

    if (status && status !== "All") {
        query = query.eq("status", status.toLowerCase());
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching coupons:", error);
        return { results: [], count: 0 };
    }

    return {
        results: data,
        count: count || 0,
    };
}

export async function getCustomers({
    page = 1,
    pageSize = 10,
    search = "",
}: {
    page?: number;
    pageSize?: number;
    search?: string;
}) {
    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("profiles") // Assuming customers are strictly in profiles for now
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

    if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching customers:", error);
        return { results: [], count: 0 };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = data.map((profile: any) => ({
        id: profile.id,
        name: profile.full_name || "N/A",
        email: profile.email || "N/A",
        phoneNumber: profile.phone_number || profile.phone || "N/A",
        totalAmount: 0, // Placeholder as we don't have order sum here yet
        status: profile.status || "Active", // Default to Active
    }));

    return {
        results,
        count: count || 0,
    };
}

export async function getCouponStats() {
    const supabase = await createClient();

    // Fetch all coupons to calculate stats
    // In a real app with many coupons, we might want to do this via RPC or db functions
    const { data: coupons } = await supabase
        .from("coupons")
        .select("*");

    let totalDiscountsGiven = 0;
    let activeCoupons = 0;
    let usedCoupons = 0;
    let expiredCoupons = 0;
    const now = new Date();

    const usageStats: Record<string, number> = {};

    coupons?.forEach(coupon => {
        // Approximate "Total Discounts Given" as sum of discount_value * used_count
        // This is rough because discount_type 'percentage' logic isn't applied here without order context.
        // But for fixed_amount it works. For percentage, 'value' is just the rate. 
        // Let's assume 'Total Discounts Given' means 'Total Value of Discounts Provided' 
        // which matches the £ amount in the screenshot.
        // Without an `orders` join or `coupon_usages` table, we can't be perfect.
        // We'll calculate a best-guess or just sum 'discount_value' if fixed.
        // Or if the metric means "How many times discounts were given", that is sum of used_count.
        // The screenshot shows "£ 120" and "12" below it. Likely "Total Value" and "Count".

        // Let's rely on `used_count` for "Used Coupons" count.
        usedCoupons += (coupon.used_count || 0);

        // For "Total Discounts Given" (Frequency):
        // The screenshot has "Total Discounts Given" with a value like £120. This implies monetary value.
        // If we don't have order data linked, we can't calculate percentage value.
        // Fallback: Sum of (discount_value * used_count) ONLY for fixed_amount. 
        if (coupon.discount_type === 'fixed_amount') {
            totalDiscountsGiven += (coupon.discount_value || 0) * (coupon.used_count || 0);
        }

        // Active/Expired
        const endDate = coupon.end_date ? new Date(coupon.end_date) : null;
        if (coupon.status === 'active' && (!endDate || endDate > now)) {
            activeCoupons++;
        } else if (coupon.status === 'expired' || (endDate && endDate <= now)) {
            expiredCoupons++;
        }

        // Collect usage for chart
        if (coupon.used_count > 0) {
            usageStats[coupon.code] = coupon.used_count;
        }
    });

    // Top 10 by usage
    const topCoupons = Object.entries(usageStats)
        .map(([code, count]) => ({ couponCode: code, usageCount: count }))
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, 10);

    return {
        totalDiscountsGiven, // Currency
        totalDiscountsCount: usedCoupons, // Count (using usedCoupons as proxy for total given for now)
        activeCoupons,
        activeCouponsCount: coupons?.length || 0, // Maybe total available vs active? Screenshot shows £100 (value?) and 756 (count?)
        // Let's align with screenshot labels:
        // "Total Discounts Given": £Value, Count
        // "Active Coupons": £Value (maybe potential?), Count
        // "Used Coupons": £Value (redeemed?), Count
        // "Expired Coupons": £Value, Count

        // Simplified mapping:
        stats: {
            totalDiscountsValue: totalDiscountsGiven,
            totalDiscountsCount: usedCoupons,
            activeCouponsCount: activeCoupons,
            usedCouponsCount: usedCoupons,
            expiredCouponsCount: expiredCoupons,
        },
        chartData: topCoupons
    };
}

export async function getCustomerStats() {
    const supabase = await createClient();

    const { count: total_customers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    const { count: active_customers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");

    const { count: inactive_customers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .neq("status", "Active");

    return {
        total_customers: total_customers || 0,
        active_customers: active_customers || 0,
        inactive_customers: inactive_customers || 0,
    };
}
