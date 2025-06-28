"use client";

import api from "@/lib/api";
import { ProductsCards } from "../cards/products";
import { products } from "@/lib/routes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { columns } from "../columns/products-columns";
import DisplayTable from "../elements/display-table";
import { useEffect, useState } from "react";

export default function ProductClient() {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(products);

  const { data, status, isLoading, refetch } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const response = await api.get(url);

      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (status === "success") {
      if (data.next) {
        setPage(page + 1);
        setUrl(data.next);
      }
    }
  }, [status]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="space-y-6 ">
      <ProductsCards loading={isLoading} />
      <DisplayTable
        title=""
        columns={columns}
        data={data.results}
        rowCount={100}
        showSearch={false}
        sortOptions={[
          { key: "name", value: "Product Name" },
          { key: "price", value: "Price" },
        ]}
        refresh={async () => {
          await refetch();
        }}
      />
    </div>
  );
}
