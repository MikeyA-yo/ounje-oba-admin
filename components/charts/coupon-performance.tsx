"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function CouponPerformanceChart({ data }: { data: any[] }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center gap-2">
        <h2 className="h6-medium">Top 10 Coupon Performance</h2>
        <div className="flex items-center gap-2 border border-[#8D8D8D] rounded-lg px-2 py-1">
          <p className="body-3">Monthly</p>
          <Icon icon={"iconoir:nav-arrow-down-solid"} />
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={400} className="mt-10">
        <BarChart data={data} margin={{ left: 20, bottom: 25, top: 10 }}>
          <CartesianGrid vertical={false} className="!stroke-gray-100" />
          <XAxis
            dataKey="couponCode"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="body-3-medium"
          >
            <Label value={"Coupon Codes"} position={"bottom"} offset={10} />
          </XAxis>
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            fontSize={"14px"}
          >
            <Label
              value={"Usage Count"}
              position={"left"}
              angle={-90}
              offset={0}
            />
          </YAxis>
          <Bar
            dataKey="usageCount"
            barSize={40}
            radius={4}
            className="fill-secondary-two"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
