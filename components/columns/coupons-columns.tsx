import { Coupon } from "@/types/coupons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

export const useCouponsColumns = (): ColumnDef<Coupon>[] => {
  return [
    {
      id: "sn",
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "code",
      header: "Coupon Code",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "discount_type",
      header: "Discount Type",
      cell: ({ row }) => (
        <span>{row.original.discount_type.toLocaleUpperCase()}</span>
      ),
    },
    {
      accessorKey: "discount_value",
      header: "Value",
    },
    {
      accessorKey: "min_purchase",
      header: "Min. Order",
      cell: ({ row }) => (
        <span className="font-semibold">{row.original.min_purchase}</span>
      ),
    },
    {
      accessorKey: "end_date",
      header: "Expiry Date",
      cell: ({ row }) => {
        const datetime = new Date(row.original.end_date);
        const date = datetime.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return <p>{date}</p>;
      },
    },
    {
      id: "usage_limit",
      accessorFn: (coupon) => `${coupon.usage_count} / ${coupon.usage_limit}`,
      header: "Usage/Limit",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const couponId = row.original.id;

        return <Button variant={"ghost"}>View</Button>;
      },
    },
  ];
};
