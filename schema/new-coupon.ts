import { z } from "zod/v4";

export const NewCouponSchema = z.object({
  code: z.string().min(1, "Coupon Code is required"),
  discountType: z.string().min(1, "Discount Type is required"),
  minAmount: z
    .string()
    .regex(/^[1-9]\d*$/, "Mininum Order Amount must be a positive number"),
  discountValue: z
    .string()
    .regex(/^[1-9]\d*$/, "Discount Value must be a positive number"),
  usageLimit: z
    .string()
    .regex(/^[1-9]\d*$/, "Usage Limit must be a positive number"),
  endDate: z.date({ error: "Invalid Date" }).min(1, "End Date is required"),
  category: z.string().min(1, "Category is required"),
});
