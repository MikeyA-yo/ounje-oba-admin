"use client";

import { useQuery } from "@tanstack/react-query";
import { CouponCards } from "../cards/coupons";
import CouponPerformanceChart from "../charts/coupon-performance";
import CouponTable from "../tables/coupons";
import api from "@/lib/api";
import { coupons } from "@/lib/routes";

export default function CouponClient() {
  const {} = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await api.get(coupons);

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <CouponCards />
      {/* <CouponTable /> */}
      <CouponPerformanceChart />
    </div>
  );
}
