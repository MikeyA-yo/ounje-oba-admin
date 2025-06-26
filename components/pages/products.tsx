"use client";

import api from "@/lib/api";
import { ProductsCards } from "../cards/products";
import ProductsTable from "../tables/products";
import { products } from "@/lib/routes";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../tables/columns/products-columns";

export default function ProductClient() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get(products);

      return response.data;
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="space-y-6 ">
      <ProductsCards loading={isLoading} />
      <ProductsTable columns={columns} data={data.results} />
    </div>
  );
}
