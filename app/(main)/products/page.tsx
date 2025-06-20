import { ProductsCards } from "@/components/cards/products";
import ProductsTable from "@/components/tables/products";

export default function Products() {
  return (
    <section className="space-y-6 mt-6">
      <ProductsCards />
      <ProductsTable />
    </section>
  );
}
