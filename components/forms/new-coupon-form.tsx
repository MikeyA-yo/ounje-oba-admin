"use client";

import { NewCouponSchema } from "@/schema/new-coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { format, parse } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Icon } from "@iconify/react";

export default function AddNewCouponForm() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
        <div className="flex items-center w-full gap-8 justify-between">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input placeholder="NEWCUSTOMER10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="discountType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Discount Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Discount">A discount type</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-8 w-full">
          <FormField
            name="minAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Min Order Amount</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="discountValue"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Discount Value</FormLabel>
                <Input placeholder="10" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between w-full gap-8">
          <FormField
            name="usageLimit"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Usage Limit</FormLabel>
                <FormControl>
                  <Input placeholder="200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePickerInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Category">A category</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Add Coupon
        </Button>
      </form>
    </Form>
  );
}

function DatePickerInput({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date | undefined) => void;
}) {
  const [inputValue, setInputValue] = useState(
    value ? format(value, "dd/MM/yyyy") : "",
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    const day = raw.slice(0, 2);
    const month = raw.slice(2, 4);
    const year = raw.slice(4, 8);
    const formatted = [day, month, year].filter(Boolean).join("/");

    setInputValue(formatted);

    const parsed = parse(formatted, "dd/MM/yyyy", new Date());
    if (!isNaN(parsed.getTime())) {
      onChange?.(parsed);
    } else {
      onChange?.(undefined);
    }
  };

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"));
    }
    onChange?.(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            placeholder="dd/mm/yyyy"
            value={inputValue}
            onChange={handleInputChange}
            inputMode="numeric"
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
          >
            <Icon icon="hugeicons:calendar-03" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
