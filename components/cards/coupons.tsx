"use client";

import { poundSign } from "@/lib/utils";
import { DetailCard } from "../elements/detail-card";

export const CouponCards = () => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Discounts Given"
        details={poundSign + " 120"}
        icon="hugeicons:discount-tag-02"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      >
        <p>12</p>
      </DetailCard>
      <DetailCard
        title="Active Coupons"
        details={poundSign + " 100"}
        icon="hugeicons:checkmark-square-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      >
        <p>756</p>
      </DetailCard>
      <DetailCard
        title="Used Coupons"
        details={poundSign + " 30"}
        icon="hugeicons:arrow-reload-horizontal"
        iconColor="#F29B4C"
        bgColor="#FCF2EA"
      >
        <p>12</p>
      </DetailCard>
      <DetailCard
        title="Expired Coupons"
        details={poundSign + " 0"}
        icon="hugeicons:multiplication-sign-square"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      >
        <p>0</p>
      </DetailCard>
    </div>
  );
};
