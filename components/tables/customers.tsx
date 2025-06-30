"use client";

import { useEffect, useState } from "react";
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
import { customers } from "@/data/customers";
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

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-[#ECF9F0] text-[#107937] hover:bg-[#ECF9F0]";
    case "Inactive":
      return "bg-[#F0F0F0] text-grey-1000 hover:bg-[#F0F0F0]";
    default:
      return "";
  }
}

export default function CustomersTable() {
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(customers.length / Number.parseInt(itemsPerPage)));
  }, [itemsPerPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(customers.map((p) => p.id));
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
    <div>
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedProducts.length === customers.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} className="table-body-row [&_td]:py-4">
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(customer.id)}
                  onCheckedChange={(checked) =>
                    handleSelectProduct(customer.id, checked as boolean)
                  }
                />
              </TableCell>
              <TableCell>
                <div>
                  {/* <img
                    src={customer.image || "/placeholder.svg"}
                    alt={customer.name}
                    className="w-10 h-10 rounded-md object-cover bg-gray-100"
                  /> */}
                  <span>{customer.name}</span>
                </div>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell className="font-semibold text-lg">
                {poundSign + " " + customer.totalAmount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost">View</Button>
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
          <span className="text-sm">
            1 – {itemsPerPage} of {customers.length} items
          </span>
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
