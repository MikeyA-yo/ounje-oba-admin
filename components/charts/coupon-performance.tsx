"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { coupons } from "@/data/coupon-performance";

const chartConfig = {
  usageCount: {
    label: "Coupon Codes",
    color: "#000",
  },
} satisfies ChartConfig;

export default function CouponPerformanceChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full border border-grey-200"
    >
      <BarChart data={coupons}>
        <CartesianGrid vertical={false} className="!stroke-gray-100" />
        <XAxis
          dataKey="couponCode"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tick={{ fill: "red" }}
          className="!stroke-red-700"
        />
        <Legend />
        <Bar dataKey="usageCount" barSize={40} className="fill-secondary-two" />
      </BarChart>
    </ChartContainer>
  );
}
