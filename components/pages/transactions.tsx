"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionCards } from "../cards/transactions";
import TransactionHistoryTable from "../tables/transactions-table";
import api from "@/lib/api";

export default function TransactionsClient() {
  const {} = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("");

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <TransactionCards />
      <TransactionHistoryTable />
    </div>
  );
}
