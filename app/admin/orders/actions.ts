"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrders({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "created_at",
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

    let query = supabase
        .from("orders")
        .select(`
            *,
            items:order_items(*)
        `, { count: "exact" })
        .range(from, to);

    if (search) {
        // Search by order_number or partial ID
        query = query.or(`order_number.ilike.%${search}%,id.ilike.%${search}%`);
    }

    if (dateRange?.from) {
        query = query.gte("created_at", dateRange.from.toISOString());
    }

    if (dateRange?.to) {
        // Adjust "to" date to end of day if it's the same as "from" or generally to include the full day
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
        case "total_asc":
            query = query.order("total_amount", { ascending: true });
            break;
        case "total_desc":
            query = query.order("total_amount", { ascending: false });
            break;
        case "status":
            query = query.order("status", { ascending: true });
            break;
        default:
            query = query.order("created_at", { ascending: false });
            break;
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching orders:", error);
        return { results: [], count: 0 };
    }

    // Map the data to match the expected format if necessary
    // For now returning as is, but might need to flatten user object depending on Type
    return {
        results: data,
        count: count || 0,
    };
}

export async function getOrderStats() {
    const supabase = await createClient();

    // distinct queries for each stat is simplest, though could be optimized
    const { count: total_orders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

    const { count: completed_orders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "delivered");

    const { count: pending_orders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

    const { count: cancelled_orders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "cancelled");

    return {
        total_orders: total_orders || 0,
        completed_orders: completed_orders || 0,
        pending_orders: pending_orders || 0,
        cancelled_orders: cancelled_orders || 0,
    };
}
