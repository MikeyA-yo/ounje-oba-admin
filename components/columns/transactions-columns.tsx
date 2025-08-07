import { Transaction } from "@/types/transactions";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function useTransactionsHistory(): ColumnDef<Transaction>[] {
  return [
    {
      id: "sn",
      header: "#",
      cell: ({ row }) => <p className="w-3">{row.index + 1}.</p>,
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorFn: (t) => `${t.date} ${t.time}`,
      header: "Date & Time",
      cell: ({ row }) => {
        const date = new Date(row.original.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        const time = new Date(row.original.time).toLocaleTimeString("en-US", {
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
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "paymentType",
      header: "Payment Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        switch (status) {
          case "Pending":
            return <Badge variant="warning">Pending</Badge>;
          case "Refunded":
            return <Badge variant="info">Refunded</Badge>;
          case "Paid":
            return <Badge variant="success">Paid</Badge>;
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
