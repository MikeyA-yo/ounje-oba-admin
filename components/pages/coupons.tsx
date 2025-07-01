"use client";

import { useQuery } from "@tanstack/react-query";
import { CouponCards } from "../cards/coupons";
import CouponPerformanceChart from "../charts/coupon-performance";
import api from "@/lib/api";
import { coupons } from "@/lib/routes";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useCouponsColumns } from "../columns/coupons-columns";
import DisplayTable from "../elements/display-table";

export default function CouponClient() {
  const columns = useCouponsColumns();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(
    coupons + `?page_size=${pageSize}` + `&page=${page}`,
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const response = await api.get(coupons);

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <CouponCards />

      {isLoading || !data ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <DisplayTable
          title=""
          columns={columns}
          data={data.results}
          count={data.count}
          pageSize={pageSize}
          setPageSize={(size) => setPageSize(size)}
          showSearch={false}
          // sortOptions={[
          //   { key: "name", value: "Product Name" },
          //   { key: "price", value: "Price" },
          //   ]}
          refresh={async () => {
            await refetch();
          }}
        />
      )}

      {/* <CouponTable /> */}
      <CouponPerformanceChart />
    </div>
  );
}
