"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderCards } from "../cards/orders";
import api from "@/lib/api";
import { orderManagement } from "@/lib/routes";
import { Skeleton } from "../ui/skeleton";
import DisplayTable from "../elements/display-table";
import { useState } from "react";
import { useOrderColumns } from "../columns/order-columns";

export default function OrdersClient() {
  const columns = useOrderColumns();
  const [pageSize /*, setPageSize */] = useState(10);
  const [page /*,  setPage */] = useState(1);
  const [url /*,  setUrl */] = useState(
    orderManagement + `?page_size=${pageSize}` + `&page=${page}`,
  );
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(url);

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <OrderCards />
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
      )}
    </div>
  );
}
