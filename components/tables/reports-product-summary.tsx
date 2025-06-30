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
import { useEffect, useState } from "react";

export default function ProductsSummaryTable() {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(productSummary.length / Number.parseInt(itemsPerPage)));
  }, [itemsPerPage]);
  return (
    <div>
      {/* Table */}
      <div className="overflow-hidden">
        <Table className="text-black">
          <TableHeader className="table-header">
            <TableRow className="">
              <TableHead>Product Name</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Avg. Price</TableHead>
              <TableHead>Returns</TableHead>
              <TableHead>Gross Margin</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productSummary.map((product) => (
              <TableRow key={product.id} className="table-body-row [&_td]:py-2">
                <TableCell className="">
                  <span className="mr-6">{product.id}.</span>
                  {product.productName}
                </TableCell>
                <TableCell className="">{product.unitsSold}</TableCell>
                <TableCell className="font-semibold text-lg">
                  {poundSign + " " + product.avgPrice}
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  {poundSign + " " + product.revenue}
                </TableCell>
                <TableCell className="">{product.returns}</TableCell>
                <TableCell className="">{product.grossMargin}</TableCell>
                <TableCell className="">{product.category}</TableCell>
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
          <span className="text-sm">1 – {itemsPerPage} of {productSummary.length} items</span>
        </div>

        <div className="flex items-center gap-4 py-1 border-l border-[#E0E0E0] pl-4">
          <div className="flex items-center gap-2">
            <Select
                value={currentPage.toString()}
              onValueChange={(value) => setCurrentPage(Number.parseInt(value))}
            >
              <SelectTrigger className="w-fit h-8 border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: pages }, (_, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm">of {pages} pages</span>

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
    </div>
  );
}
