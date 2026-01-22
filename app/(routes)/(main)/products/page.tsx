"use client";

import { getProducts } from "@/app/admin/products/actions";
import { ProductsCards } from "@/components/cards/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useProductColumns } from "@/components/columns/products-columns";
import DisplayTable from "@/components/elements/display-table";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function Products() {
  const [pageSize /* , setPageSize */] = useState(10);
  const [page /* , setPage */] = useState(1);
  const [search, setSearch] = useState("");
  const columns = useProductColumns();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page, search],
    queryFn: async () => {
      const { results, count } = await getProducts({
        page,
        pageSize,
        search,
      });
      return { results, count };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <section className="mt-6">
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
            showSearch={true}
            searchValue={search}
            onSearchChange={setSearch}
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
    </section>
  );
}
