"use client";

import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/app/admin/marketing/actions";
import { CustomerCards } from "@/components/cards/customers";
// import api from "@/lib/api";
import DisplayTable from "@/components/elements/display-table";
// import { customers } from "@/data/customers";
import { useCustomersColumn } from "@/components/columns/customer-columns";

import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

export default function Customers() {
  const column = useCustomersColumn();
  const [page, setPage] = useState(1);
  const [pageSize,] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["customers", page, search],
    queryFn: async () => {
      const { results, count } = await getCustomers({
        page,
        pageSize,
        search,
      });
      return { results, count };
    },
    placeholderData: keepPreviousData,
  });

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <CustomerCards />

        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <DisplayTable
            title="All Customers"
            data={data.results}
            columns={column}
            count={data.count}
            pageSize={pageSize}
            pageIndex={page - 1}
            onPageChange={(p) => setPage(p + 1)}
            manualPagination={true}
            showSearch={true}
            searchValue={search}
            onSearchChange={setSearch}
            refresh={async () => {
              await refetch();
            }}
          />
        )}
      </div>
    </section>
  );
}
