import { OrderCards } from "@/components/cards/orders";
import OrdersTable from "@/components/tables/orders";

export default function Orders() {
  return (
    <section className="space-y-6 mt-6">
      <OrderCards />
      <OrdersTable />
    </section>
  );
}
