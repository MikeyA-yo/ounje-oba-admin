"use client";

import { poundSign } from "@/lib/utils";
import { DetailCard } from "../elements/detail-card";
import { Icon } from "@iconify/react";

export const ReportCards = () => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Revenue"
        details={poundSign + " 2,456"}
        icon="hugeicons:money-bag-02"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      >
        <div className="flex flex-row flex-nowrap justify-between text-sm">
          <div className="text-black-500">
            <p>+15.03%</p>
            <Icon icon="hugeicons:trade-up" />
          </div>
          <p className="text-grey-800">Last 30 days</p>
        </div>
      </DetailCard>
      <DetailCard
        title="Total Orders"
        details={poundSign + " 1,456"}
        icon="hugeicons:package"
        iconColor="#785D19"
        bgColor="#FFF9E4"
      >
        <div className="flex flex-row flex-nowrap justify-between text-sm">
          <div className="text-black-500">
            <p>+15.03%</p>
            <Icon icon="hugeicons:trade-up" />
          </div>
          <p className="text-grey-800">Last 30 days</p>
        </div>
      </DetailCard>
      <DetailCard
        title="Total Customers"
        details="24"
        icon="hugeicons:user-multiple"
        iconColor="#196278"
        bgColor="#EBFDFF"
      >
        <div className="flex flex-row flex-nowrap justify-between text-sm">
          <div className="text-black-500">
            <p>+15.03%</p>
            <Icon icon="hugeicons:trade-up" />
          </div>
          <p className="text-grey-800">Last 30 days</p>
        </div>
      </DetailCard>
      <DetailCard
        title="New Customers"
        details="7"
        icon="hugeicons:user-add-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      >
        <div className="flex flex-row flex-nowrap justify-between text-sm">
          <div className="text-black-500">
            <p>+15.03%</p>
            <Icon icon="hugeicons:trade-up" />
          </div>
          <p className="text-grey-800">Last 30 days</p>
        </div>
      </DetailCard>
    </div>
  );
};
