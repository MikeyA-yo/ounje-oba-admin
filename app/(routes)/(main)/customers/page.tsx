"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/app/admin/marketing/actions";
import { CustomerCards } from "@/components/cards/customers";
// import api from "@/lib/api";
import DisplayTable from "@/components/elements/display-table";
// import { customers } from "@/data/customers";
import { useCustomersColumn } from "@/components/columns/customer-columns";

export default function Customers() {
  const column = useCustomersColumn();
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { results, count } = await getCustomers({
        // page,
        // pageSize
      });
      return { results, count };
    },
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <CustomerCards />

        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <DisplayTable
            title=""
            data={data.results}
            columns={column}
            count={data.count}
            showSearch={false}
            refresh={async () => { }}
          />
        )}
      </div>
    </section>
  );
}
