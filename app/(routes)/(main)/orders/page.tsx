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
export default function Orders() {
  const columns = useOrderColumns();
  const [pageSize /*, setPageSize */] = useState(10);
  const [page /*,  setPage */] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const { results, count } = await getOrders({
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
            // setPageSize={(size) => setPageSize(size)}
            // sortOptions={[
            //   { key: "name", value: "Product Name" },
            //   { key: "price", value: "Price" },
            //   ]}
            refresh={async () => {
              await refetch();
            }}
          />
        )}
      </div>
    </section>
  );
}
