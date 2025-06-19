"use client";

import { poundSign } from "@/lib/utils";
import { DetailCard } from "../elements/detail-card";

export const TransactionCards = () => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Transactions"
        details={poundSign + " 2,456"}
        icon="hugeicons:arrow-data-transfer-horizontal"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      >
        <p>770</p>
      </DetailCard>
      <DetailCard
        title="Revenue"
        details={poundSign + " 9,157"}
        icon="hugeicons:money-receive-circle"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      >
        <p>756</p>
      </DetailCard>
      <DetailCard
        title="Pending"
        details={poundSign + " 300"}
        icon="hugeicons:clock-01"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      >
        <p>12</p>
      </DetailCard>
      <DetailCard
        title="Refunds"
        details={poundSign + " 200"}
        icon="hugeicons:arrow-turn-backward"
        iconColor="#1D55CE"
        bgColor="#E9EFFC"
      >
        <p>2</p>
      </DetailCard>
    </div>
  );
};
