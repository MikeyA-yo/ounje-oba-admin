import { z } from "zod/v4";

export const singleProductSchema = z
  .object({
    productName: z.string().min(1, "Product name cannot be empty"),
    category: z.string().min(1, "Category is required"),
    sku: z.string().min(1, "SKU is required"),
    stockQty: z
      .string()
      .regex(/^[1-9]\d*$/, "Stock Quantity must be a positive number"),
    lowStock: z
      .string()
      .regex(/^[1-9]\d*$/, "Low Stock Alert must be a positive number"),
    cost: z.string().regex(/^[1-9]\d*$/, "Cost must be a positive number"),
    description: z.string().min(1, "Description is required"),
    specification: z.string().min(1, "Specification is required"),
    images: z
      .any()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: "Please upload at least one image",
      }),
    variation: z.enum(["yes", "no"], { error: "This field is required" }),
    loyalty: z.enum(["yes", "no"], { error: "This field is required" }),
  })
  .refine((data) => Number(data.lowStock) <= Number(data.stockQty), {
    error: "Low stock alert cannot be greater than stock quantity",
    path: ["lowStock"],
  });
