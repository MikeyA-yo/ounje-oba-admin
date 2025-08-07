"use client";

import { useQuery } from "@tanstack/react-query";
import { ReportCards } from "@/components/cards/reports";
import api from "@/lib/api";
import CustomerGrowth from "@/components/charts/customer-growth";
import OrdersTrendChart from "@/components/charts/dashboard-orders-trend";
import RevenueTrendChart from "@/components/charts/dashboard-revenue-trend";
import { products } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayTable from "@/components/elements/display-table";
import { useReportProducts } from "@/components/columns/report-columns";
import PaymentMethodChart from "@/components/charts/payment-method";

export default function Reports() {
  const columns = useReportProducts();
  const rowCount = 10;

  const { isLoading, data } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await api.get(products);

      return response.data;
    },
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <ReportCards />

        {isLoading || !data ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <>
            <CustomerGrowth />

            <div className="grid [grid-template-columns:65%_auto] gap-6">
              <RevenueTrendChart />
              <OrdersTrendChart />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <PaymentMethodChart />
              <PaymentMethodChart />
            </div>

            <DisplayTable
              title="Products Summary"
              columns={columns}
              data={data.results.slice(0, rowCount)}
              count={rowCount}
              // setPageSize={(size) => setPageSize(size)}
              sortOptions={[
                { key: "name", value: "Product Name" },
                { key: "price", value: "Price" },
              ]}
              refresh={async () => {}}
            />
          </>
        )}
        {/* <TopSellingProducts /> */}
        {/* <ProductsSummaryTable /> */}
      </div>
    </section>
  );
}
