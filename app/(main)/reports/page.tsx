import { ReportCards } from "@/components/cards/reports";
import ProductsSummaryTable from "@/components/tables/reports-product-summary";
import TopSellingProducts from "@/components/tables/reports-top-selling-products";

export default function Reports() {
  return (
    <section className="space-y-6 mt-6">
      <ReportCards />
      <TopSellingProducts />
      <ProductsSummaryTable />
    </section>
  );
}
