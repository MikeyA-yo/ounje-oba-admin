"use client";

import { useQueries } from "@tanstack/react-query";
import { HomeCards } from "@/components/cards/home";
import api from "@/lib/api";
import { orderManagement, products } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayTable from "@/components/elements/display-table";
import {
  useSummaryColumns,
  useTopProductsColums,
} from "@/components/columns/dashboard-columns";
import { SummaryTable } from "@/components/elements/summary-table";
import { recentOrders, topCustomers } from "@/data/home";
import RevenueTrendChart from "@/components/charts/dashboard-revenue-trend";
import OrdersTrendChart from "@/components/charts/dashboard-orders-trend";

export default function Home() {
  const topSellingColumns = useTopProductsColums();
  const topSellingCount = 6;

  const summaryColumns = useSummaryColumns();
  const summaryCount = 8;

  const results = useQueries({
    queries: ["products", "orders"].map((query, i) => ({
      queryKey: ["home " + query],
      queryFn: async () => {
        const response = await api.get(i === 0 ? products : orderManagement);

        return response.data;
      },
    })),
  });

  const isLoading = results.reduce(
    (prev, curr) => prev || curr.isLoading,
    false,
  );
  const hasData = results.reduce((prev, curr) => prev || !!curr.data, false);

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <HomeCards />
        {isLoading || !hasData ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="grid [grid-template-columns:65%_auto] gap-6">
            <DisplayTable
              title="Top Selling Products"
              columns={topSellingColumns}
              data={results[0].data.results.slice(0, topSellingCount)}
              count={topSellingCount}
              showFooter={false}
              showSortBy={false}
              refresh={async () => {
                await results[0].refetch();
              }}
            />

            <SummaryTable title="Top Customers" href="#" data={topCustomers} />

            <RevenueTrendChart />

            <OrdersTrendChart />

            <DisplayTable
              title="Products Summary"
              columns={summaryColumns}
              data={results[0].data.results.slice(0, summaryCount)}
              count={summaryCount}
              showFooter={false}
              showSortBy={false}
              refresh={async () => {
                await results[0].refetch();
              }}
            />

            <SummaryTable title="Recent Orders" href="#" data={recentOrders} />
          </div>
        )}
      </div>
    </section>
  );
}
