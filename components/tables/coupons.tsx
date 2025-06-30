"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DisplayTable from "../elements/display-table";
import { Icon } from "@iconify/react";
import { coupons } from "@/data/coupons";
import { poundSign } from "@/lib/utils";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-[#ecf9f0] text-[#107937] hover:bg-[#ecf9f0]">
          {status}
        </Badge>
      );
    case "Expired":
      return (
        <Badge className="bg-[#FCEDEE] text-error hover:bg-[#FCEDEE]">
          {status}
        </Badge>
      );
    case "Limited":
      return (
        <Badge className="bg-[#fdf9e7] text-[#f1c21b] hover:bg-[#fdf9e7]">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function CouponTable() {
  const [itemsPerPage, setItemsPerPage] = useState("10");

  return (
    <DisplayTable title="Coupons">
      {/* Table */}
      <div className="overflow-hidden">
        <Table className="text-black">
          <TableHeader className="table-header">
            <TableRow className="">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Coupon Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Min. Order</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Usage/Limit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id} className="table-body-row [&_td]:py-2">
                <TableCell className="">{coupon.id}.</TableCell>
                <TableCell className="">{coupon.couponCode}</TableCell>
                <TableCell className="">{coupon.description}</TableCell>
                <TableCell className="">{coupon.type}</TableCell>
                <TableCell className="">{coupon.value}</TableCell>
                <TableCell className="font-semibold text-lg">
                  {poundSign + " " + coupon.minOrder}
                </TableCell>
                <TableCell className="">{coupon.expiryDate}</TableCell>
                <TableCell className="">{coupon.usageLimit}</TableCell>
                <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                <TableCell>
                  <Button variant="ghost">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
