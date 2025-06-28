"use client";

import { useQuery } from "@tanstack/react-query";
import { CustomerCards } from "../cards/customers";
import CustomersTable from "../tables/customers";
import api from "@/lib/api";

export default function CustomerClient() {
  const {} = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await api.get("");

      return response.data;
    },
  });

  return (
    <div className="space-y-6">
      <CustomerCards />
      {/* <CustomersTable /> */}
    </div>
  );
}
