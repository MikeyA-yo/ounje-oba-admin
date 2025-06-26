"use client";

import { useQuery } from "@tanstack/react-query";
import { OrderCards } from "../cards/orders";
import OrdersTable from "../tables/orders";
import api from "@/lib/api";
import { orderManagement } from "@/lib/routes";

export default function OrdersClient() {
  const {} = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get(orderManagement);

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <OrderCards />
      <OrdersTable />
    </div>
  );
}
