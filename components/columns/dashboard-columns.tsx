import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

export const useTopProductsColums = (): ColumnDef<Product>[] => {
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
      header: "Product Name",
    },
    {
      accessorKey: "category.name",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold">
          {row.original.currency.symbol + " " + row.getValue("price")}
        </span>
      ),
    },
    {
      accessorKey: "stock_status",
      header: "Stock Status",
      cell: ({ cell }) => {
        const status = cell.getValue();

        switch (status) {
          case "in_stock":
            return <Badge variant="success">In Stock</Badge>;
          case "low_stock":
            return <Badge variant="warning">Low Stock</Badge>;
          case "out_of_stock":
            return <Badge variant="danger">Out of Stock</Badge>;
        }
      },
    },
    {
      accessorKey: "stock_quantity",
      header: "Units",
    },
  ];
};

export const useSummaryColumns = (): ColumnDef<Product>[] => {
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
  ];
};
