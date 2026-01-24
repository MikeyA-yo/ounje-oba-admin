export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) {
    const { orderId } = await params;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <p>Order ID: {orderId}</p>
            <p className="text-muted-foreground mt-2">Details view coming soon...</p>
        </div>
    );
}
