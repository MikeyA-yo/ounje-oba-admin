"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportCards } from "@/components/cards/reports";
import CustomerGrowth from "@/components/charts/customer-growth";
import OrdersTrendChart from "@/components/charts/dashboard-orders-trend";
import RevenueTrendChart from "@/components/charts/dashboard-revenue-trend";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayTable from "@/components/elements/display-table";
import { useReportProducts } from "@/components/columns/report-columns";
import PaymentMethodChart from "@/components/charts/payment-method";
import {
  getCustomerGrowthData,
  getOrdersStatusStats,
  getPaymentMethodStats,
  getReportStats,
  getRevenueData,
} from "@/app/admin/analytics/actions";
import { getProducts } from "@/app/admin/products/actions";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export default function Reports() {
  const columns = useReportProducts();
  const [pageSize] = useState(10);
  const [page] = useState(1);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["report-stats", date],
    queryFn: async () => await getReportStats({ from: date?.from, to: date?.to }),
  });

  const { data: revenueData, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ["revenue-data", date],
    queryFn: async () => await getRevenueData({ from: date?.from, to: date?.to }),
  });

  const { data: ordersTrendData, isLoading: isLoadingOrdersTrend } = useQuery({
    queryKey: ["orders-trend-data"],
    queryFn: async () => await getOrdersStatusStats(),
  });

  const { data: customerGrowthData, isLoading: isLoadingCustomerGrowth } = useQuery({
    queryKey: ["customer-growth-data", date],
    queryFn: async () => await getCustomerGrowthData({ from: date?.from, to: date?.to }),
  });

  const { data: paymentMethodData, isLoading: isLoadingPaymentMethod } = useQuery({
    queryKey: ["payment-method-data"],
    queryFn: async () => await getPaymentMethodStats(),
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["report-products", page, pageSize],
    queryFn: async () => await getProducts({ page, pageSize }),
  });

  const isLoading =
    isLoadingStats ||
    isLoadingRevenue ||
    isLoadingOrdersTrend ||
    isLoadingCustomerGrowth ||
    isLoadingPaymentMethod ||
    isLoadingProducts;

  return (
    <section className="mt-6">
      {/* Header with Date Picker */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Reports</h2>
      </div>

      <div className="space-y-6">
        {isLoading || !stats ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : (
          <>
            <ReportCards stats={stats} />

            <CustomerGrowth
              data={customerGrowthData || []}
              date={date}
              setDate={setDate}
            />

            <div className="grid [grid-template-columns:65%_auto] gap-6">
              <RevenueTrendChart
                data={revenueData || []}
                date={date}
                setDate={setDate}
              />
              <OrdersTrendChart data={ordersTrendData || []} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <PaymentMethodChart data={paymentMethodData || []} />
              {/* Duplicated chart in original code, maybe intended? Keeping one for now or both if user wants structure. 
                  Original had two. I'll keep one unique one as it makes more sense, or duplicate if layout requires it. 
                  layout showed 2 in grid. I'll put a placeholder or the same one for valid UI. 
                  Actually let's just show one or maybe there's another chart missing? 
                  The user request didn't specify a new chart. I'll keep one to avoid duplication weirdness unless I had 2 diff datasets.
                  But to preserve layout, I'll just render it once or maybe the second was a placeholder. 
                  I'll render it once spanning full width or just one. 
                  Actually, looking at previous file, it was:
                  <PaymentMethodChart />
                  <PaymentMethodChart />
                  I'll just keep one for now to be clean, or duplicate if I must filling the grid.
                  Better: "Products Summary" table is next.
               */}
              {/* If I remove one, I should check grid-cols-2. If only 1 child, it takes half space. 
                   I'll leave it as is (one chart) but maybe change class to not grid-cols-2? 
                   Or just duplicate it like the user had it. I'll duplicate to minimize visual change risk.
               */}
              <PaymentMethodChart data={paymentMethodData || []} />
            </div>

            <DisplayTable
              title="Products Summary"
              columns={columns}
              data={productsData?.results || []}
              count={productsData?.count || 0}
              pageSize={pageSize}
              showSearch={false}
              sortOptions={[
                { key: "name", value: "Product Name" },
                { key: "price", value: "Price" },
              ]}
              refresh={async () => { }}
            />
          </>
        )}
      </div>
    </section>
  );
}
