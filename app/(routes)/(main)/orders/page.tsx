"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/app/admin/orders/actions";
import { OrderCards } from "@/components/cards/orders";
// import api from "@/lib/api";
// import { orderManagement } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
import DisplayTable from "@/components/elements/display-table";
import { useState } from "react";
import { useOrderColumns } from "@/components/columns/order-columns";
import { DateRange } from "react-day-picker";

export default function Orders() {
  const columns = useOrderColumns();
  const [pageSize /*, setPageSize */] = useState(10);
  const [page /*,  setPage */] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders", page, search, sortBy, dateRange],
    queryFn: async () => {
      const { results, count } = await getOrders({
        page,
        pageSize,
        search,
        sortBy,
        dateRange: dateRange as { from: Date; to: Date } | undefined,
      });
      return { results, count };
    },
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <OrderCards />
        {isLoading || !data ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <DisplayTable
            title="Recent Orders"
            columns={columns}
            data={data.results}
            count={data.count}
            pageSize={pageSize}
            showDateRange={true}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            showSearch={true}
            searchValue={search}
            onSearchChange={setSearch}
            showSortBy={true}
            sortOptions={[
              { key: "date_desc", value: "Newest First" },
              { key: "date_asc", value: "Oldest First" },
              { key: "total_asc", value: "Total (Low - High)" },
              { key: "total_desc", value: "Total (High - Low)" },
              { key: "status", value: "Status" },
            ]}
            onSortChange={setSortBy}
            refresh={async () => {
              await refetch();
            }}
          />
        )}
      </div>
    </section>
  );
}
