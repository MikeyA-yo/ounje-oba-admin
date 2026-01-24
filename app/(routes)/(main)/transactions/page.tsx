"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionCards } from "@/components/cards/transactions";
import DisplayTable from "@/components/elements/display-table";
import { useTransactionsHistory } from "@/components/columns/transactions-columns";
import { getTransactions, getTransactionStats } from "@/app/admin/analytics/actions";

import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export default function Transactions() {
  const column = useTransactionsHistory();
  const [page,] = useState(1);
  const [pageSize,] = useState(20);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["transactions", page, search, sortBy, dateRange],
    queryFn: async () => await getTransactions({
      page,
      pageSize,
      search,
      sortBy,
      dateRange: dateRange as { from: Date; to: Date } | undefined,
    }),
    placeholderData: keepPreviousData,
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
            pageSize={pageSize}
            // manualPagination={true}
            // pageIndex={page - 1}
            // onPageChange={(p) => setPage(p + 1)}
            showSearch={true}
            searchValue={search}
            onSearchChange={setSearch}
            showSortBy={true}
            sortOptions={[
              { key: "date_desc", value: "Newest First" },
              { key: "date_asc", value: "Oldest First" },
              { key: "amount_desc", value: "Amount (High - Low)" },
              { key: "amount_asc", value: "Amount (Low - High)" },
              { key: "status", value: "Status" },
            ]}
            onSortChange={setSortBy}
            showDateRange={true}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            refresh={async () => {
              await refetch();
            }}
          />
        )}
      </div>
    </section>
  );
}
