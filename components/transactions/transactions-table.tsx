"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  RefreshCw,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { transactions } from "@/data/transactions";
import { DisplayTable } from "../elements/display-table";

const getStatusBadge = (status: string) => {
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
    case "Pending":
      return (
        <Badge className="bg-[#fdf9e7] text-[#f1c21b] hover:bg-[#fdf9e7]">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function TransactionHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DisplayTable title="Transaction History">
      {/* Table */}
      <div className="border border-[#e0e0e0] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f7f7f7] border-b border-[#e0e0e0]">
              <TableHead className="text-[#525252] font-medium w-12">
                #
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Transaction ID
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Customer
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Date & Time
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Amount
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Payment Type
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Status
              </TableHead>
              <TableHead className="text-[#525252] font-medium">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-b border-[#f5f5f5] hover:bg-[#f7f7f7]/50"
              >
                <TableCell className="text-[#8d8d8d] font-medium">
                  {transaction.id}.
                </TableCell>
                <TableCell className="text-[#2e2e2e] font-medium">
                  {transaction.transactionId}
                </TableCell>
                <TableCell className="text-[#2e2e2e]">
                  {transaction.customer}
                </TableCell>
                <TableCell className="text-[#2e2e2e]">
                  <div>
                    <div>{transaction.date}</div>
                    <div className="text-[#8d8d8d] text-sm">
                      {transaction.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#2e2e2e] font-medium">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-[#2e2e2e]">
                  {transaction.paymentType}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="text-[#5c1978] hover:text-[#5c1978] hover:bg-[#5c1978]/10"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-[#525252] text-sm">Items per page:</span>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-16 h-8 border-[#e0e0e0]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#525252] text-sm">1 – 100 of 1,228 items</span>

          <div className="flex items-center gap-2">
            <Select
              value="1"
              onValueChange={(value) => setCurrentPage(Number.parseInt(value))}
            >
              <SelectTrigger className="w-12 h-8 border-[#e0e0e0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-[#525252] text-sm">of 13 pages</span>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#e0e0e0]"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#e0e0e0]"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DisplayTable>
  );
}
