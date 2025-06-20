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
import { DisplayTable } from "../elements/display-table";
import { products } from "@/data/products";
import { poundSign } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

function getVisibilityColor(status: string) {
  switch (status) {
    case "Visible":
      return "bg-[#ECF9F0] text-[#107937] hover:bg-[#ECF9F0]";
    case "Hidden":
      return "bg-[#F0F0F0] text-grey-1000 hover:bg-[#F0F0F0]";
    default:
      return "";
  }
}

export default function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  return (
    <DisplayTable title="" showSearch={false}>
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
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
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
                  <span>{product.productName}</span>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell className="font-semibold text-lg">
                {poundSign + " " + product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge className={getStockStatusColor(product.stockStatus)}>
                  {product.stockStatus}
                </Badge>
              </TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>
                <Badge className={getVisibilityColor(product.visibility)}>
                  {product.visibility}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-row flex-nowrap text-base">
                  <Button variant="ghost" className="text-black">
                    <Icon icon="hugeicons:pencil-edit-02" />
                  </Button>
                  <Button variant="ghost" className="text-black">
                    <Icon icon="hugeicons:delete-02" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="table-footer flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-1 border-r border-[#E0E0E0]">
          <span className="text-sm">Items per page:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-fit h-8 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 px-4">
          <span className="text-sm">1 – 100 of 1,228 items</span>
        </div>

        <div className="flex items-center gap-4 py-1 border-l border-[#E0E0E0] pl-4">
          <div className="flex items-center gap-2">
            <Select
              value="1"
              onValueChange={(value) => setCurrentPage(Number.parseInt(value))}
            >
              <SelectTrigger className="w-fit h-8 border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">of 13 pages</span>

            <div className="">
              <Button
                variant="ghost"
                className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
              >
                <Icon icon="hugeicons:arrow-left-01" />
              </Button>
              <Button
                variant="ghost"
                className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
              >
                <Icon icon="hugeicons:arrow-right-01" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DisplayTable>
  );
}
