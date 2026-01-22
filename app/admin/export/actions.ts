"use server";

import { getDashboardStats, getTopCustomers, getRevenueData, getOrdersStatusStats } from "@/app/admin/analytics/actions";
import { getProducts } from "@/app/admin/products/actions";
import { getOrders } from "@/app/admin/orders/actions";

export async function exportDashboardData() {
    try {
        const [
            stats,
            revenueTrend,
            ordersTrend,
            topCustomers,
            products,
            orders
        ] = await Promise.all([
            getDashboardStats(),
            getRevenueData(),
            getOrdersStatusStats(),
            getTopCustomers(),
            getProducts({ page: 1, pageSize: 100 }), // Get a decent amount
            getOrders({ page: 1, pageSize: 100 })
        ]);

        return {
            stats,
            revenueTrend,
            ordersTrend,
            topCustomers,
            products: products.results,
            orders: orders.results,
            message: "Data fetched successfully"
        };
    } catch (error) {
        console.error("Error exporting data:", error);
        throw new Error("Failed to export data");
    }
}
