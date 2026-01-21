"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCoupons({
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
        .from("coupons")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

    if (search) {
        query = query.ilike("code", `%${search}%`);
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
        // query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching customers:", error);
        return { results: [], count: 0 };
    }

    return {
        results: data,
        count: count || 0,
    };
}
