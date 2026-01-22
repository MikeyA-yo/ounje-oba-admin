"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }

    return data;
}

export async function markNotificationAsRead(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);

    if (error) {
        console.error("Error marking notification as read:", error);
    }

    revalidatePath("/");
}
