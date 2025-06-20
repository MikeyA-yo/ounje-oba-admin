"use client";

import { NewCouponSchema } from "@/schema/new-coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Form } from "../ui/form";

export const AddNewCouponForm = () => {
  const form = useForm<z.infer<typeof NewCouponSchema>>({
    resolver: zodResolver(NewCouponSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      discountType: "",
      minAmount: "",
      usageLimit: "",
      category: "",
      discountValue: "",
    },
  });

  function onSubmit() {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};
