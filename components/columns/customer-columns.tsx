import { Customer } from "@/types/customer";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export function useCustomersColumn(): ColumnDef<Customer>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Customer Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.totalAmount}</span>
      ),
    },
    {
      accessorKey: "stock_status",
      header: "Stock Status",
      cell: ({ cell }) => {
        const status = cell.getValue();

        switch (status) {
          case "Active":
            return <Badge variant="success">Active</Badge>;
          case "Inactive":
            return <Badge variant="secondary">Inactive</Badge>;
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({}) => {
        // const orderId = row.original.id;

        return <Button variant={"ghost"}>View</Button>;
      },
    },
  ];
}
