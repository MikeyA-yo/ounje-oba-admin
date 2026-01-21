"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProducts({
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
        .from("products")
        .select(
            `
      *,
      category:categories(name)
    `,
            { count: "exact" }
        )
        .range(from, to)
        .order("created_at", { ascending: false });

    if (search) {
        query = query.ilike("name", `%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error("Error fetching products:", error);
        return { results: [], count: 0 };
    }

    return {
        results: data,
        count: count || 0,
    };
}

export async function getCategories() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

    return data;
}

export async function createProduct(formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock_quantity = parseInt(formData.get("stock_quantity") as string);
    const description = formData.get("description") as string;
    // const sku = formData.get("sku") as string; // Assuming we add SKU to schema later or put in metadata
    // const low_stock_alert = formData.get("low_stock_alert");
    // const specification = formData.get("specification");

    // Handle Images
    const imageFiles = formData.getAll("image_files") as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
        if (file instanceof File && file.size > 0) {
            const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
            const { data, error } = await supabase.storage
                .from("products") // Ensure this bucket exists
                .upload(fileName, file);

            if (error) {
                console.error("Error uploading image:", error);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("products")
                .getPublicUrl(fileName);

            imageUrls.push(publicUrl);
        }
    }

    // Generate Slug
    const slug = name.toLowerCase().replace(/ /g, "-") + "-" + Date.now();

    const { data, error } = await supabase
        .from("products")
        .insert({
            name,
            slug,
            category_id,
            price,
            stock_quantity,
            description,
            images: imageUrls,
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating product:", error);
        throw new Error(error.message);
    }

    revalidatePath("/products");
    return data;
}
