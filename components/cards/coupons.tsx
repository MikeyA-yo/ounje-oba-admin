"use client";

import { DetailCard } from "../elements/detail-card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CouponCards = ({ stats }: { stats: any }) => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Discounts Given"
        details={`₦${stats?.totalDiscountsValue?.toLocaleString() || 0}`}
        icon="hugeicons:discount-tag-02"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      >
        <p>{stats?.totalDiscountsCount || 0}</p>
      </DetailCard>
      <DetailCard
        title="Active Coupons"
        details={`${stats?.activeCouponsCount || 0}`}
        icon="hugeicons:checkmark-square-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      >
        {/* Value not easily calculable without "potential" logic, hiding or showing count duplicately */}
        <p>Active</p>
      </DetailCard>
      <DetailCard
        title="Used Coupons"
        details={`${stats?.usedCouponsCount || 0}`}
        icon="hugeicons:arrow-reload-horizontal"
        iconColor="#F29B4C"
        bgColor="#FCF2EA"
      >
        <p>Redeemed</p>
      </DetailCard>
      <DetailCard
        title="Expired Coupons"
        details={`${stats?.expiredCouponsCount || 0}`}
        icon="hugeicons:multiplication-sign-square"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      >
        <p>Expired</p>
      </DetailCard>
    </div>
  );
};
