"use client";

import {
  getDashboardStats,
  getTopCustomers,
  getRevenueData,
} from "@/app/admin/analytics/actions";
import { getProducts } from "@/app/admin/products/actions";
import { getOrders } from "@/app/admin/orders/actions";
// import { DisplayTable, HomeCards, SummaryTable } from "@/components";
import {
  useTopProductsColums,
  useSummaryColumns,
} from "@/components/columns/dashboard-columns";
// import { OrdersTrendChart, RevenueTrendChart } from "@/components/charts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { startOfMonth, endOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { DisplayTable, HomeCards, SummaryTable } from "@/components/index";
import { OrdersTrendChart, RevenueTrendChart } from "@/components/charts";
import { useDebounce } from "@/hooks/use-debounce";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || 6;

  const topSellingColumns = useTopProductsColums();
  const summaryColumns = useSummaryColumns();
  const summaryCount = 8;

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const onPageChange = (newPage: number) => {
    router.push(`${pathname}?${createQueryString("page", (newPage + 1).toString())}`, { scroll: false });
  };

  const [topProductsSearch, setTopProductsSearch] = useState("");
  const debouncedTopProductsSearch = useDebounce(topProductsSearch, 500);

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => await getDashboardStats(),
  });

  const { data: topSellingData, isLoading: isLoadingTopSelling } = useQuery({
    queryKey: ["dashboard-top-selling", debouncedTopProductsSearch],
    queryFn: async () => await getProducts({ page: 1, pageSize: 6, search: debouncedTopProductsSearch }),
  });

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["dashboard-products", page, pageSize],
    queryFn: async () => await getProducts({ page, pageSize }),
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue-data", date?.from, date?.to],
    queryFn: async () => await getRevenueData({ from: date?.from, to: date?.to }),
  });

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["dashboard-orders"],
    queryFn: async () => await getOrders({ page: 1, pageSize: summaryCount }),
  });

  const { data: topCustomersData, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["dashboard-top-customers"],
    queryFn: async () => await getTopCustomers(),
  });

  const isLoading = isLoadingStats || isLoadingProducts || isLoadingOrders || isLoadingCustomers || isLoadingTopSelling;

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
              data={topSellingData?.results || []}
              count={topSellingData?.count || 0}
              showFooter={false}
              showSortBy={false}
              refresh={async () => { }}
              searchValue={topProductsSearch}
              onSearchChange={setTopProductsSearch}
            />

            <SummaryTable title="Top Customers" href="#" data={topCustomersData || []} />

            <RevenueTrendChart
              data={revenueData}
              date={date}
              setDate={setDate}
            />

            <OrdersTrendChart />

            <DisplayTable
              title="Products Summary"
              columns={summaryColumns}
              data={productsData?.results || []}
              count={productsData?.count || 0}
              showFooter={true}
              showSortBy={false}
              refresh={async () => { }}
              pageSize={pageSize}
              pageIndex={page - 1}
              manualPagination={true}
              onPageChange={onPageChange}
            />

            <SummaryTable title="Recent Orders" href="#" data={ordersData?.results || []} />
          </div>
        )}
      </div>
    </section>
  );
}
