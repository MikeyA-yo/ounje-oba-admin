"use client";

import api from "@/lib/api";
import { ProductsCards } from "../cards/products";
import { products } from "@/lib/routes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useProductColumns } from "../columns/products-columns";
import DisplayTable from "../elements/display-table";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProductClient() {
  const [pageSize /* , setPageSize */] = useState(10);
  const [page /* , setPage */] = useState(1);
  const [url /* , setUrl */] = useState(
    products + `?page_size=${pageSize}` + `&page=${page}`,
  );
  const columns = useProductColumns();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await api.get(url);

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  /*   useEffect(() => {
    if (status === "success") {
      if (data.next) {
        setPage(page + 1);
        setUrl(data.next);
      }
    }
  }, [status, data?.next, page]); */

  return (
    <div className="space-y-6 ">
      <ProductsCards />
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
          sortOptions={[
            { key: "name", value: "Product Name" },
            { key: "price", value: "Price" },
          ]}
          refresh={async () => {
            await refetch();
          }}
        />
      )}
    </div>
  );
}
