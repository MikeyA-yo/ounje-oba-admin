import { z } from "zod/v4";

export const singleProductSchema = z
  .object({
    name: z.string().min(1, "Product name cannot be empty"),
    category_id: z.string().min(1, "Category is required"),
    sku: z.string().min(1, "SKU is required"),
    stock_quantity: z
      .string()
      .regex(/^[1-9]\d*$/, "Stock Quantity must be a positive number"),
    low_stock_alert: z
      .string()
      .regex(/^[1-9]\d*$/, "Low Stock Alert must be a positive number"),
    price: z.string().regex(/^[1-9]\d*$/, "Cost must be a positive number"),
    description: z.string().min(1, "Description is required"),
    specification: z.string().min(1, "Specification is required"),
    image_files: z
      .custom<FileList>()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: "Please upload at least one image",
      }),
    variation: z
      .enum(["yes", "no"] /* , { error: "This field is required" } */)
      .optional(),
    loyalty: z.enum(["yes", "no"], { error: "This field is required" }),
  })
  .refine(
    (data) => Number(data.stock_quantity) > Number(data.low_stock_alert),
    {
      message: "Stock Quantity must be greater than Low Stock Alert",
      path: ["low_stock_alert"],
    },
  );

export const variationSchema = z.object({
  variations: z
    .array(
      z.object({
        variationType: z.string().min(1, "Type is required"),
        variationValues: z
          .array(z.string().min(1, "Value is required"))
          .min(1, "At least one value is required"),
      }),
    )
    .min(1, "At least one variation is required"),
});
