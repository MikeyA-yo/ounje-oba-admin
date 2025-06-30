"use client";

import { useEffect, useState } from "react";
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
import { orders } from "@/data/orders";
import { Icon } from "@iconify/react";
import { poundSign } from "@/lib/utils";

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-[#ecf9f0] text-[#107937] hover:bg-[#ecf9f0]">
          {status}
        </Badge>
      );
    case "Refunded":
      return (
        <Badge className="bg-[#e9effc] text-[#1d55ce] hover:bg-[#e9effc]">
          {status}
        </Badge>
      );
    case "Unpaid":
      return (
        <Badge className="bg-[#FCEDEE] text-error hover:bg-[#FCEDEE]">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return (
        <Badge className="bg-[#ecf9f0] text-[#107937] hover:bg-[#ecf9f0]">
          {status}
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-[#FCEDEE] text-error hover:bg-[#FCEDEE]">
          {status}
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-[#fdf9e7] text-[#f1c21b] hover:bg-[#fdf9e7]">
          {status}
        </Badge>
      );
    case "In Progress":
      return (
        <Badge className="bg-[#F0F0F0] text-grey-1000 hover:bg-[#F0F0F0]">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function OrdersTable() {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1); 
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(orders.length / Number.parseInt(itemsPerPage)));
  }, [itemsPerPage]);

  return (
    <div>
      {/* Table */}
      <div className="overflow-hidden">
        <Table className="text-black">
          <TableHeader className="table-header">
            <TableRow className="">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="table-body-row [&_td]:py-4">
                <TableCell className="">{order.id}.</TableCell>
                <TableCell className="">{order.orderID}</TableCell>
                <TableCell className="">{order.customer}</TableCell>
                <TableCell className="text-wrap w-48">{order.items}</TableCell>
                <TableCell className="">
                  <div>
                    <div>{order.date}</div>
                    <div className="text-sm">{order.time}</div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  {poundSign + "" + order.total}
                </TableCell>
                <TableCell>{getPaymentBadge(order.payment)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
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
          <span className="text-sm">1 – {itemsPerPage} of {orders.length} items</span>
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
