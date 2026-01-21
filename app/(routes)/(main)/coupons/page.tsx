"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "@/app/admin/marketing/actions";
import { CouponCards } from "@/components/cards/coupons";
import CouponPerformanceChart from "@/components/charts/coupon-performance";
// import api from "@/lib/api";
// import { coupons } from "@/lib/routes";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCouponsColumns } from "@/components/columns/coupons-columns";
import DisplayTable from "@/components/elements/display-table";

export default function Coupon() {
  const columns = useCouponsColumns();
  const [pageSize /*, setPageSize */] = useState(10);
  const [page /*, setPage */] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coupons", page],
    queryFn: async () => {
      const { results, count } = await getCoupons({
        page,
        pageSize,
        search: "",
      });
      return { results, count };
    },
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <CouponCards />

        {isLoading || !data ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <>
            <DisplayTable
              title=""
              columns={columns}
              data={data.results}
              count={data.count}
              pageSize={pageSize}
              // setPageSize={(size) => setPageSize(size)}
              showSearch={false}
              // sortOptions={[
              //   { key: "name", value: "Product Name" },
              //   { key: "price", value: "Price" },
              //   ]}
              refresh={async () => {
                await refetch();
              }}
            />
            <CouponPerformanceChart />
          </>
        )}
      </div>
    </section>
  );
}
