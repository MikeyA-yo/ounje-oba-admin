import { CustomerCards } from "@/components/cards/customers";
import CustomersTable from "@/components/tables/customers";

export default function Customers() {
  return (
    <section className="space-y-6 mt-6">
      <CustomerCards />
      <CustomersTable />
    </section>
  );
}
