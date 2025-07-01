"use client";

import { useQuery } from "@tanstack/react-query";
import { DetailCard } from "../elements/detail-card";
import api from "@/lib/api";
import { orderManagementStats } from "@/lib/routes";
import { Skeleton } from "../ui/skeleton";

export const OrderCards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders_stats"],
    queryFn: async () => {
      const response = await api.get(orderManagementStats);

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
            title="Total Orders"
            details={data.total_orders}
            icon="hugeicons:package"
            iconColor="#5C1978"
            bgColor="#F6F2F7"
          />
          <DetailCard
            title="Completed Orders"
            details={data.completed_orders}
            icon="hugeicons:package-delivered"
            iconColor="#24A148"
            bgColor="#F1F9F3"
          />
          <DetailCard
            title="Pending Orders"
            details={data.pending_orders}
            icon="hugeicons:package-process"
            iconColor="#F1C21B"
            bgColor="#FEFAEC"
          />
          <DetailCard
            title="Cancelled Orders"
            details={data.cancelled_orders}
            icon="hugeicons:package-remove"
            iconColor="#DA1E28"
            bgColor="#FCEDEE"
          />
        </div>
      )}
    </>
  );
};
