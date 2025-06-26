"use client";

import { useQuery } from "@tanstack/react-query";
import { HomeCards } from "../cards/home";
import ProductsSummaryTable from "../tables/main-products-summary";
import TopSellingProductsTable from "../tables/main-top-selling-products";
import api from "@/lib/api";
import { productsStats } from "@/lib/routes";

export default function HomeClient() {
  const {} = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get(productsStats);

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <HomeCards />
      <div>
        <TopSellingProductsTable />
      </div>
      <ProductsSummaryTable />
    </div>
  );
}
