"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionCards } from "@/components/cards/transactions";
import api from "@/lib/api";
import DisplayTable from "@/components/elements/display-table";
import { transactions } from "@/data/transactions";
import { useTransactionsHistory } from "@/components/columns/transactions-columns";

export default function Transactions() {
  const column = useTransactionsHistory();
  const {} = useQuery({
    queryKey: ["transactions"],
    retry: false,
    queryFn: async () => {
      const response = await api.get("");

      return response.data;
    },
  });

  return (
    <section className="mt-4">
      <div className="space-y-6">
        <TransactionCards />
        <DisplayTable
          title="Transaction History"
          data={transactions}
          columns={column}
          count={transactions.length}
          refresh={async () => {}}
        />
        {/* <TransactionHistoryTable /> */}
      </div>
    </section>
  );
}
