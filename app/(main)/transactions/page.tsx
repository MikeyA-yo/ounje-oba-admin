import { TransactionCards } from "@/components/cards/transactions";
import TransactionHistoryTable from "@/components/tables/transactions-table";

export default function Transactions() {
  return (
    <section className="space-y-6 mt-4">
      <TransactionCards />
      <TransactionHistoryTable />
    </section>
  );
}
