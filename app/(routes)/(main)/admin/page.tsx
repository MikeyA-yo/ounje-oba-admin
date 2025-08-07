"use client";

import AdminCards from "@/components/cards/admin";
import { useAdminColumns } from "@/components/columns/admin-columns";
import DisplayTable from "@/components/elements/display-table";
import { users } from "@/data/admin-users";

export default function AdminManagement() {
  const adminColumns = useAdminColumns();

  return (
    <section className="mt-6">
      <div className="space-y-6">
        <AdminCards />

        <DisplayTable
          title="All Users"
          columns={adminColumns}
          data={users}
          count={users.length}
          refresh={async () => {}}
          showDateRange={true}
          showFooter={false}
        />
      </div>
    </section>
  );
}
