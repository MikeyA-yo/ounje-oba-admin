"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "@/app/admin/products/actions";
import { toast } from "sonner";
import { useState } from "react";

export const useProductColumns = (refresh?: () => void): ColumnDef<Product>[] => {
  const router = useRouter();

  const DeleteAction = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
      setIsLoading(true);
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        if (refresh) {
          refresh();
        }
      } catch (error) {
        toast.error("Failed to delete product");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="text-black">
            <Icon icon="hugeicons:delete-02" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

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
            <DeleteAction id={productId} />
          </div>
        );
      },
    },
  ];
};
