"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DisplayTable } from "../elements/display-table";
import { Icon } from "@iconify/react";
import { productSummary } from "@/data/products-summary";
import { poundSign } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { reportProducts } from "@/data/top-selling";
import { Badge } from "../ui/badge";

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

export default function TopSellingProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <DisplayTable title="Top Selling Products">
      {/* Table */}
      <div className="overflow-hidden">
        <Table className="text-black">
          <TableHeader className="table-header">
            <TableRow className="">
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Stock Left</TableHead>
              <TableHead>Stock Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportProducts.map((product) => (
              <TableRow key={product.id} className="table-body-row [&_td]:py-2">
                <TableCell className="">
                  <span className="mr-6">{product.id}.</span>
                  {product.productName}
                </TableCell>
                <TableCell className="">{product.category}</TableCell>
                <TableCell className="">{product.unitSold}</TableCell>
                <TableCell className="font-semibold text-lg">
                  {poundSign + " " + product.revenue}
                </TableCell>
                <TableCell className="">{product.stockLeft}</TableCell>
                <TableCell>
                  <Badge className={getStockStatusColor(product.stockStatus)}>
                    {product.stockStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
