import { TransactionCards } from "@/components/transactions/cards";
import TransactionHistoryTable from "@/components/transactions/transactions-table";

export default function Transactions() {
  return (
    <section className="space-y-8 mt-4">
      <TransactionCards />
      <TransactionHistoryTable />
    </section>
  );
}
