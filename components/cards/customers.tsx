"use client";

import { useQuery } from "@tanstack/react-query";
import { DetailCard } from "../elements/detail-card";
import { getCustomerStats } from "@/app/admin/marketing/actions";
import { Skeleton } from "../ui/skeleton";

export const CustomerCards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["customer_stats"],
    queryFn: async () => {
      return await getCustomerStats();
    },
  });

  if (isLoading || !data) {
    return (
      <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row gap-4 items-center w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-36 rounded-lg w-full md:w-auto md:flex-1 ${i === 2 ? 'col-span-2 @4xl/main:basis-1/3' : ''}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row gap-4 items-center w-full">
      <DetailCard
        title="Total Customers"
        details={String(data.total_customers)}
        icon="hugeicons:user-multiple"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      />
      <DetailCard
        title="Active Customers"
        details={String(data.active_customers)}
        icon="hugeicons:user-check-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      />
      <div className="col-span-2 w-full @4xl/main:basis-1/3">
        <DetailCard
          title="Inactive Customers"
          details={String(data.inactive_customers)}
          icon="hugeicons:user-remove-02"
          iconColor="#525252"
          bgColor="#F0F0F0"
        />
      </div>
    </div>
  );
};
