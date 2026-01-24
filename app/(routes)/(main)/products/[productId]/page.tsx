import { getProduct } from "@/app/admin/products/actions";
import SingleProductForm from "@/components/forms/single-product-form";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ productId: string }>;
}) {
    const { productId } = await params;

    // Fetch product data
    const product = await getProduct(productId);

    return (
        <section className="mt-6">
            <SingleProductForm product={product} />
        </section>
    );
}
