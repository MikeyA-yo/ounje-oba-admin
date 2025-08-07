import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";

export function useReportProducts(): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <p>
          <span className="mr-4">{row.index + 1}.</span> {row.original.name}
        </p>
      ),
    },
    {
      accessorKey: "stock_quantity",
      header: "Units Sold",
    },
    {
      id: "revenue",
      header: "Revenue",
      cell: ({ row }) => (
        <p className="font-semibold">
          {row.original.currency.symbol}{" "}
          {row.original.price * row.original.stock_quantity}
        </p>
      ),
    },
    {
      accessorKey: "price",
      header: "Avg. Price",
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.original.currency.symbol + " " + row.getValue("price")}
        </span>
      ),
    },
    {
      id: "returns",
      accessorKey: "stock_quantity",
      header: "Returns",
    },
    { id: "margin", header: "Gross Margin", cell: "50%" },
    { accessorKey: "category.name", header: "Category" },
  ];
}
