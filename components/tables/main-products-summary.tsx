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

export default function ProductsSummaryTable() {
  return (
    <DisplayTable title="Products Summary" showSortBy={false}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DisplayTable>
  );
}
