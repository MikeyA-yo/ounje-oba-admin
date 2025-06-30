"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportCards } from "../cards/reports";
import api from "@/lib/api";

export default function ReportsClient() {
  const { } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await api.get("");

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <ReportCards />
      {/* <TopSellingProducts /> */}
      {/* <ProductsSummaryTable /> */}
    </div>
  );
}
