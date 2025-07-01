import { Order, OrderStatus } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export const useOrderColumns = (): ColumnDef<Order>[] => {
  return [
    {
      id: "sn",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "order_number",
      header: "Order No",
    },
    {
      accessorKey: "customer_name",
      header: "Customer",
    },
    {
      id: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items.map((item) => item.product_name);

        return (
          <p className="max-w-32">
            <span>{items.length} </span>
            items: <span>{items.join(", ")}</span>
          </p>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Date & Time",
      cell: ({ row }) => {
        const datetime = new Date(row.original.created_at);
        const date = datetime.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        const time = datetime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return (
          <div className="flex flex-col gap-2">
            <p>{date}</p>
            <p>{time}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.total_amount}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status: OrderStatus = row.original.status;

        switch (status) {
          case "pending":
            return <Badge variant="warning">Pending</Badge>;
          case "shipped":
            return <Badge variant="info">Shipped</Badge>;
          case "processing":
            return <Badge variant="secondary">Processing</Badge>;
          case "delivered":
            return <Badge variant="success">Delivered</Badge>;
          case "cancelled":
            return <Badge variant="danger">Cancelled</Badge>;
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
};
