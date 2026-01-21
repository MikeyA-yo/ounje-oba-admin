"use client";

import { DetailCard } from "../elements/detail-card";

export const TransactionCards = ({
  stats,
}: {
  stats: {
    totalCount: number;
    totalAmount: number;
    pendingCount: number;
    pendingAmount: number;
    refundedCount: number;
    refundedAmount: number;
    paidCount: number; // Derived as needed or separate
    paidAmount: number;
  };
}) => {
  return (
    <div className="flex flex-col @md/main:grid @md/main:grid-cols-2 @md/main:grid-flow-row @4xl/main:flex @4xl/main:flex-row @4xl/main:flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Transactions"
        details={`₦${stats.totalAmount.toLocaleString()}`}
        icon="hugeicons:arrow-data-transfer-horizontal"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      >
        <p>{stats.totalCount}</p>
      </DetailCard>
      <DetailCard
        title="Revenue"
        details={`₦${stats.paidAmount.toLocaleString()}`} // Assuming revenue comes from paid
        icon="hugeicons:money-receive-circle"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      >
        <p>{stats.paidCount}</p>
      </DetailCard>
      <DetailCard
        title="Pending"
        details={`₦${stats.pendingAmount.toLocaleString()}`}
        icon="hugeicons:clock-01"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      >
        <p>{stats.pendingCount}</p>
      </DetailCard>
      <DetailCard
        title="Refunds"
        details={`₦${stats.refundedAmount.toLocaleString()}`}
        icon="hugeicons:arrow-turn-backward"
        iconColor="#1D55CE"
        bgColor="#E9EFFC"
      >
        <p>{stats.refundedCount}</p>
      </DetailCard>
    </div>
  );
};
