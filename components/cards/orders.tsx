"use client";

import { DetailCard } from "../elements/detail-card";

export const OrderCards = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Orders"
        details="1420"
        icon="hugeicons:package"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      />
      <DetailCard
        title="Completed Orders"
        details="1365"
        icon="hugeicons:package-delivered"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      />
      <DetailCard
        title="Pending Orders"
        details="12"
        icon="hugeicons:package-process"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      />
      <DetailCard
        title="Cancelled Orders"
        details="43"
        icon="hugeicons:package-remove"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      />
    </div>
  );
};
