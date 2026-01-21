
"use client";

import { HomeCards } from "@/components/cards/home";
import DisplayTable from "@/components/elements/display-table";
import {
  useSummaryColumns,
  useTopProductsColums,
} from "@/components/columns/dashboard-columns";
import { SummaryTable } from "@/components/elements/summary-table";
// import { topCustomers } from "@/data/home"; // Keeping topCustomers mock for now as we don't have a good metric yet
import RevenueTrendChart from "@/components/charts/dashboard-revenue-trend";
import OrdersTrendChart from "@/components/charts/dashboard-orders-trend";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRevenueData,
  getTopCustomers,
} from "@/app/admin/analytics/actions";
import { getProducts } from "@/app/admin/products/actions";
import { getOrders } from "@/app/admin/orders/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const topSellingColumns = useTopProductsColums();
  const topSellingCount = 6;

  const summaryColumns = useSummaryColumns();
  const summaryCount = 8;

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => await getDashboardStats(),
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: async () => await getProducts({ page: 1, pageSize: topSellingCount }),
  });

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["dashboard-orders"],
    queryFn: async () => await getOrders({ page: 1, pageSize: summaryCount }),
  });

  const { data: topCustomersData, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["dashboard-top-customers"],
    queryFn: async () => await getTopCustomers(),
  });

  // Re-use logic for loading state
  const isLoading = isLoadingStats || isLoadingProducts || isLoadingOrders || isLoadingCustomers;

  return (
    <section className="mt-6">
      <div className="space-y-6">
        {isLoading || !stats ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <HomeCards stats={stats} />
        )}

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <div className="grid [grid-template-columns:65%_auto] gap-6">
            <DisplayTable
              title="Top Selling Products"
              columns={topSellingColumns}
              data={productsData?.results || []}
              count={productsData?.count || 0}
              showFooter={false}
              showSortBy={false}
              refresh={async () => { }}
            />

            <SummaryTable title="Top Customers" href="#" data={topCustomersData || []} />

            <RevenueTrendChart />

            <OrdersTrendChart />

            <DisplayTable
              title="Products Summary"
              columns={summaryColumns}
              data={productsData?.results || []} // Reusing products list for now as 'Products Summary'
              count={productsData?.count || 0}
              showFooter={false}
              showSortBy={false}
              refresh={async () => { }}
            />

            <SummaryTable title="Recent Orders" href="#" data={ordersData?.results || []} />
          </div>
        )}
      </div>
    </section>
  );
}
