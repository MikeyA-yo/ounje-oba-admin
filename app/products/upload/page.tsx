import { Icon } from "@iconify/react";
import { SingleProductForm } from "@/components/forms/single-product-form";
import Link from "next/link";

export default function SingleProductUpload() {
  return (
    <section className="w-11/12 sm:w-5/6 md:w-3/4 mx-auto">
      <Link href="/products" className="flex flex-row items-center gap-4">
        <Icon icon="hugeicons:arrow-left-02" className="text-xl" />
        <h1 className="font-bold text-2xl my-6">Single Product Upload</h1>
      </Link>

      <SingleProductForm />
    </section>
  );
}
