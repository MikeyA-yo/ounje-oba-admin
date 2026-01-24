"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProducts({
    page = 1,
    pageSize = 10,
    search = "",
    sortBy = "created_at",
}: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
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
        .range(from, to);

    if (sortBy === "price") {
        query = query.order("price", { ascending: true });
    } else if (sortBy === "name") {
        query = query.order("name", { ascending: true });
    } else {
        query = query.order("created_at", { ascending: false });
    }

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
            const { error } = await supabase.storage
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

export async function getProductStats() {
    const supabase = await createClient();
    const { data: products, error } = await supabase.from("products").select("stock_quantity");

    if (error) {
        console.error("Error fetching product stats:", error);
        return {
            total_products: 0,
            active_products: 0,
            low_stock: 0,
            out_of_stock: 0,
        };
    }

    const total_products = products?.length || 0;
    const out_of_stock = products?.filter(p => p.stock_quantity === 0).length || 0;
    // Assuming active means available/in-stock (stock > 0)
    const active_products = products?.filter(p => p.stock_quantity > 0).length || 0;

    // Low stock: stock <= 10 (since low_stock_alert might not exist)
    const low_stock = products?.filter(p => {
        const threshold = 10;
        return p.stock_quantity > 0 && p.stock_quantity <= threshold;
    }).length || 0;

    return {
        total_products,
        active_products, // In Stock
        low_stock,
        out_of_stock,
    };
}

export async function deleteProduct(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
        console.error("Error deleting product:", error);
        throw new Error(error.message);
    }

    revalidatePath("/products");
}

export async function getProduct(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(name)
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }

    return data;
}

export async function updateProduct(id: string, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock_quantity = parseInt(formData.get("stock_quantity") as string);
    const description = formData.get("description") as string;
    const sku = formData.get("sku") as string;
    const low_stock_alert = parseInt(formData.get("low_stock_alert") as string) || 0;
    const specification = formData.get("specification") as string;

    // Handle Images
    const imageFiles = formData.getAll("image_files") as File[];

    const imageUrls: string[] = [];
    const existingImages = formData.getAll("existing_images") as string[];

    for (const file of imageFiles) {
        if (file instanceof File && file.size > 0) {
            const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
            const { error } = await supabase.storage
                .from("products")
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

    // Combine existing (if any passed) with new
    const finalImages = [...(existingImages || []), ...imageUrls];

    const updateData: {
        name: string;
        category_id: string;
        price: number;
        stock_quantity: number;
        description: string;
        sku: string;
        low_stock_alert: number;
        specification: string;
        updated_at: string;
        images?: string[];
    } = {
        name,
        category_id,
        price,
        stock_quantity,
        description,
        sku,
        low_stock_alert,
        specification,
        updated_at: new Date().toISOString(),
    };

    if (finalImages.length > 0) {
        updateData.images = finalImages;
    }

    const { data, error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating product:", error);
        throw new Error(error.message);
    }

    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    return data;
}
