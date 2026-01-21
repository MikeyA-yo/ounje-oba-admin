"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionCards } from "@/components/cards/transactions";
import DisplayTable from "@/components/elements/display-table";
import { useTransactionsHistory } from "@/components/columns/transactions-columns";
import { getTransactions, getTransactionStats } from "@/app/admin/analytics/actions";

export default function Transactions() {
  const column = useTransactionsHistory();
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => await getTransactions({ page: 1, pageSize: 20 }),
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["transaction-stats"],
    queryFn: async () => await getTransactionStats(),
  });

  return (
    <section className="mt-4">
      <div className="space-y-6">
        {isLoadingStats || !stats ? (
          <div className="space-y-4">
            {/* Loading Skeleton */}
          </div>
        ) : (
          <TransactionCards stats={stats} />
        )}

        {isLoading ? (
          <div className="space-y-4">
            {/* Skeleton or loading state */}
          </div>
        ) : (
          <DisplayTable
            title="Transaction History"
            data={data?.results || []}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={column as any} // Casting as any temporarily if type mismatch due to strict ColumnDef
            count={data?.count || 0}
            refresh={async () => { }}
          />
        )}
      </div>
    </section>
  );
}
