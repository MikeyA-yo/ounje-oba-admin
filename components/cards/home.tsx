"use client";

import { DetailCard } from "../elements/detail-card";

export const HomeCards = ({
  stats,
}: {
  stats: {
    totalRevenue: number;
    ordersCount: number;
    productsCount: number;
    usersCount: number;
  };
}) => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Sales"
        details={`₦${stats.totalRevenue.toLocaleString()}`}
        icon="hugeicons:money-receive-circle"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      />
      <DetailCard
        title="Total Orders"
        details={stats.ordersCount.toString()}
        icon="hugeicons:package-delivered"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      />
      <DetailCard
        title="Active Products"
        details={stats.productsCount.toString()}
        icon="hugeicons:checkmark-square-02"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      />
      <DetailCard
        title="Total Users"
        details={stats.usersCount.toString()}
        icon="hugeicons:user-multiple-02"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      />
    </div>
  );
};
