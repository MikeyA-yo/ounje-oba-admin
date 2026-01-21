"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export const useProductColumns = (): ColumnDef<Product>[] => {
  const router = useRouter();

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
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold">
          {(row.original.currency?.symbol || "₦") + " " + row.getValue("price")}
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
    {
      accessorKey: "is_active",
      header: "Visibility",
      cell: ({ cell }) => {
        const visibility = cell.getValue();

        switch (visibility) {
          case true:
            return <Badge variant="success">Active</Badge>;
          case false:
            return <Badge variant="secondary">Inactive</Badge>;
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;
        // use product const to get the product id
        const productId = product.id;

        return (
          <div className="flex flex-row flex-nowrap">
            <Button
              variant="ghost"
              className="text-black"
              onClick={() => {
                router.push(`/products/${productId}`);
              }}
            >
              <Icon icon="hugeicons:pencil-edit-02" />
            </Button>
            <Button
              variant="ghost"
              className="text-black"
              onClick={() => {
                router.push(`/products/${productId}`);
              }}
            >
              <Icon icon="hugeicons:delete-02" />
            </Button>
          </div>
        );
      },
    },
  ];
};
