"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { DetailCard } from "../elements/detail-card";
import { Skeleton } from "@/components/ui/skeleton";
import { productsStats } from "@/lib/routes";

export const ProductsCards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products_stats"],
    queryFn: async () => {
      const response = await api.get(productsStats);

      return response.data;
    },
  });

  return (
    <>
      {isLoading || !data ? (
        <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-36 rounded-lg w-full md:w-auto md:flex-1"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
          <DetailCard
            title="Total Products"
            details={data.total_products}
            icon="hugeicons:tags"
            iconColor="#5C1978"
            bgColor="#F6F2F7"
          />
          <DetailCard
            title="In Stock"
            details={data.active_products}
            icon="hugeicons:checkmark-square-02"
            iconColor="#24A148"
            bgColor="#F1F9F3"
          />
          <DetailCard
            title="Low Stock"
            details={data.low_stock}
            icon="hugeicons:alert-02"
            iconColor="#F1C21B"
            bgColor="#FEFAEC"
          />
          <DetailCard
            title="Out of Stock"
            details={data.out_of_stock}
            icon="hugeicons:multiplication-sign-square"
            iconColor="#DA1E28"
            bgColor="#FCEDEE"
          />
        </div>
      )}
    </>
  );
};
