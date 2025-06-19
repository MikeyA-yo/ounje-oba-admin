"use client";

import { DetailCard } from "../elements/detail-card";

export const CustomerCards = () => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row gap-4 items-center w-full">
      <DetailCard
        title="Total Customers"
        details="1420"
        icon="hugeicons:user-multiple"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      />
      <DetailCard
        title="Active Customers"
        details="1365"
        icon="hugeicons:user-check-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      />
      <div className="col-span-2 w-full @4xl/main:basis-1/3">
        <DetailCard
          title="Inactive Customers"
          details="12"
          icon="hugeicons:user-remove-02"
          iconColor="#525252"
          bgColor="#F0F0F0"
        />
      </div>
    </div>
  );
};
