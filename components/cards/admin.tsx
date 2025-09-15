"use client";

import { DetailCard } from "../elements/detail-card";

export default function AdminCards() {
  return (
    <>
      <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
        <DetailCard
          title="Total Users"
          details={"6"}
          icon="hugeicons:user-multiple"
          iconColor="#5C1978"
          bgColor="#F6F2F7"
        />
        <DetailCard
          title="Active Users"
          details={"2"}
          icon="hugeicons:user-check-02"
          iconColor="#24A148"
          bgColor="#F1F9F3"
        />
        <DetailCard
          title="Pending Users"
          details={"1"}
          icon="hugeicons:user-block-02"
          iconColor="#F1C21B"
          bgColor="#FEFAEC"
        />
        <DetailCard
          title="Inactive Users"
          details={"3"}
          icon="hugeicons:user-remove-02"
          iconColor="#525252"
          bgColor="#F0F0F0"
        />
      </div>
    </>
  );
}
