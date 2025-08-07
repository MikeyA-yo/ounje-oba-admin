"use client";

import { useQuery } from "@tanstack/react-query";
import { CustomerCards } from "@/components/cards/customers";
import api from "@/lib/api";
import DisplayTable from "@/components/elements/display-table";
import { customers } from "@/data/customers";
import { useCustomersColumn } from "@/components/columns/customer-columns";

export default function Customers() {
  const column = useCustomersColumn();
  const {} = useQuery({
    queryKey: ["customers"],
    retry: false,
    queryFn: async () => {
      const response = await api.get("");

      return response.data;
    },
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <CustomerCards />

        <DisplayTable
          title=""
          data={customers}
          columns={column}
          count={customers.length}
          showSearch={false}
          refresh={async () => {}}
        />
        {/* <CustomersTable /> */}
      </div>
    </section>
  );
}
