import { CouponCards } from "@/components/cards/coupons";
import CouponTable from "@/components/tables/coupons";

export default function Coupon() {
  return (
    <section className="space-y-6 mt-6">
      <CouponCards />
      <CouponTable />
    </section>
  );
}
