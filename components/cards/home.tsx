"use client";

import { DetailCard } from "../elements/detail-card";

export const HomeCards = () => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Sales"
        details="1420"
        icon="hugeicons:money-receive-circle"
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
        title="Active Products"
        details="12"
        icon="hugeicons:checkmark-square-02"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      />
      <DetailCard
        title="Out of Stock"
        details="43"
        icon="hugeicons:multiplication-sign-square"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      />
    </div>
  );
};
