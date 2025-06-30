"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

export default function DisplayTable<TData, TValue>({
  title,
  columns,
  data,
  rowCount,
  showSortBy = true,
  showSearch = true,
  sortOptions = [],
  refresh,
}: {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  showSortBy?: boolean;
  showSearch?: boolean;
  sortOptions?: { key: keyof TData; value: string }[];
  refresh: () => Promise<void>;
}) {
  const [sortValue, setSortValue] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  const getLastIndex = useMemo(() => {
    const rowCount = table.getRowCount();

    return pagination.pageSize * (pagination.pageIndex + 1) < rowCount
      ? pagination.pageSize * (pagination.pageIndex + 1)
      : rowCount;
  }, [table, pagination.pageSize, pagination.pageIndex]);

  return (
    <div className="w-full max-w-7xl mx-auto border border-grey-200 rounded-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-y-4">
        <div>
          <h1 className="text-2xl font-medium">{title}</h1>
          {!showSearch && (
            <div className="relative flex-1 md:flex-none">
              <Icon
                icon="hugeicons:search-01"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252]"
              />
              <Input
                placeholder="Search"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full  border-[#8D8D8D]"
              />
            </div>
          )}
        </div>

        <div className="flex w-full md:w-fit flex-wrap justify-center md:justify-end items-center gap-3">
          <Button
            variant="outline"
            size={"md"}
            className="border-[#8D8D8D] text-black"
            onClick={async () => await refresh()}
          >
            <Icon icon="hugeicons:arrow-reload-horizontal" />
          </Button>

          <Button
            variant="outline"
            size={"md"}
            className="gap-2 border-[#8D8D8D] text-black"
          >
            Filter
            <Icon icon="hugeicons:filter-horizontal" />
          </Button>

          {showSortBy && (
            <Select
              value={sortValue}
              onValueChange={(val) => {
                setSortValue(val);

                if (val !== "") {
                  table.setSorting(() => [{ id: val, desc: false }]);
                }
              }}
            >
              <SelectTrigger className="w-36 border-[#8D8D8D]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option, index) => (
                  <SelectItem key={index} value={option.key as string}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showSearch && (
            <div className="relative flex-1 md:flex-none">
              <Icon
                icon="hugeicons:search-01"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252]"
              />
              <Input
                placeholder="Search"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full  border-[#8D8D8D]"
              />
            </div>
          )}

          <Button
            type="reset"
            variant="outline"
            size="md"
            onClick={() => {
              if (sortValue) {
                setSortValue("");
                table.resetSorting();
              }
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="">
        <Table>
          <TableHeader className="bg-grey text-black-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-none hover:bg-grey-100 [&_td]:py-6"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2 text-black bg-[#F7F7F7] border-t border-[#E0E0E0] flex items-center justify-between">
        <div className="flex items-center gap-2 px-4 py-1 border-r border-[#E0E0E0]">
          <span className="text-sm">Items per page:</span>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(val) => {
              const newSize = Number.parseInt(val);
              const [whole, frac] = (rowCount / newSize)
                .toFixed(1)
                .split(".")
                .map((n) => Number.parseInt(n));
              console.log(whole, frac);
              const newIndex = frac > 0 ? whole + 1 - 1 : whole - 1;

              setPagination({ pageIndex: newIndex, pageSize: newSize });
            }}
          >
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
            {pagination.pageIndex * pagination.pageSize + 1} – {getLastIndex}{" "}
            of {table.getRowCount()} items
          </span>
        </div>

        <div className="flex items-center gap-4 py-1 border-l border-[#E0E0E0] pl-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Page {pagination.pageIndex + 1} of {table.getPageCount()} pages
            </span>

            <div className="">
              <Button
                variant="ghost"
                className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <Icon icon="hugeicons:arrow-left-01" />
              </Button>
              <Button
                variant="ghost"
                className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
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
