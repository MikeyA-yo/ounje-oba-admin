"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dashboardProducts as products } from "@/data/top-selling";
import { poundSign } from "@/lib/utils";

function getStockStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "bg-[#ECF9F0] text-[#107937] hover:bg-[#ECF9F0]";
    case "Low Stock":
      return "bg-[#FDF9E7] text-warning hover:bg-[#FDF9E7]";
    case "Out of Stock":
      return "bg-[#FCEDEE] text-error hover:bg-[#FCEDEE]";
    default:
      return "";
  }
}

export default function TopSellingProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProducts.length === products.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id} className="table-body-row [&_td]:py-6">
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(product.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <div>
                  {/* <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover bg-gray-100"
                  /> */}
                  <span>{product.name}</span>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="font-semibold">
                {poundSign + " " + product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge className={getStockStatusColor(product.stockStatus)}>
                  {product.stockStatus}
                </Badge>
              </TableCell>
              <TableCell>{product.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
