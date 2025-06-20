import { HomeCards } from "@/components/cards/home";
import TopSellingProductsTable from "@/components/tables/main-top-selling-products";
import ProductsSummaryTable from "@/components/tables/main-products-summary";

export default function Home() {
  return (
    <section className="space-y-4 mt-6">
      <HomeCards />
      <div>
        <TopSellingProductsTable />
      </div>
      <ProductsSummaryTable />
    </section>
  );
}
