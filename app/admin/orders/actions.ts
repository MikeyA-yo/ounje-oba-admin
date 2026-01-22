"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrders({
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
        .from("orders")
        .select(`
            *,
            items:order_items(*)
        `, { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

    if (search) {
        // Search by order_number or partial ID
        query = query.or(`order_number.ilike.%${search}%,id.ilike.%${search}%`);
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
