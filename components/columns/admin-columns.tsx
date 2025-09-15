import { AdminUser } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const useAdminColumns = (): ColumnDef<AdminUser>[] => {
  return [
    {
      id: "sn",
      header: "#",
      cell: ({ row }) => `${row.index + 1}.`,
    },
    {
      accessorKey: "fullName",
      header: "User Full Name",
    },
    {
      accessorKey: "email",
      header: "Email Address",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "permissionLevel",
      header: "Permission Level",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ cell }) => {
        const status = cell.getValue();

        switch (status) {
          case "Active":
            return <Badge variant="success">Active</Badge>;
          case "Pending":
            return <Badge variant="warning">Pending</Badge>;
          case "Inactive":
            return <Badge variant="secondary">Inactive</Badge>;
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex flex-row flex-nowrap">
            <Button asChild variant="ghost" className="text-black">
              <Link href={"/admin/user/" + user.id}>
                <Icon icon="hugeicons:pencil-edit-02" />
              </Link>
            </Button>
            <Button variant="ghost" className="text-black">
              <Link href={"/admin/user"}>
                <Icon icon="hugeicons:delete-02" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
};
