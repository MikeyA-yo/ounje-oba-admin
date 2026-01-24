"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoupons, getCouponStats } from "@/app/admin/marketing/actions";
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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at_desc");
  const [filter, setFilter] = useState("All");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["coupons", page, search, sortBy, filter],
    queryFn: async () => {
      const { results, count } = await getCoupons({
        page,
        pageSize,
        search,
        sortBy,
        status: filter,
      });
      return { results, count };
    },
  });

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ["coupon-stats"],
    queryFn: async () => await getCouponStats(),
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        {isLoadingStats || !statsData ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <CouponCards stats={statsData.stats} />
        )}

        {isLoading || !data ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <>
            <DisplayTable
              title="Coupons"
              columns={columns}
              data={data.results}
              count={data.count}
              pageSize={pageSize}
              // setPageSize={(size) => setPageSize(size)}
              showSearch={true}
              searchValue={search}
              onSearchChange={setSearch}
              showSortBy={true}
              sortOptions={[
                { key: "created_at_desc", value: "Newest First" },
                { key: "created_at_asc", value: "Oldest First" },
                { key: "value_desc", value: "Value (High-Low)" },
                { key: "value_asc", value: "Value (Low-High)" },
              ]}
              onSortChange={setSortBy}
              showFilter={true}
              filterValue={filter}
              onFilterChange={setFilter}
              filterOptions={[
                { label: "All Status", value: "All" },
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
                { label: "Expired", value: "Expired" },
              ]}
              refresh={async () => {
                await refetch();
              }}
            />
            <CouponPerformanceChart data={statsData?.chartData || []} />
          </> // Added optional chaining backup if statsData isn't loaded yet, though parent check exists.
        )}
      </div>
    </section>
  );
}
