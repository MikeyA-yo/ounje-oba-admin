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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { type DateRange } from "react-day-picker";

export default function DisplayTable<TData, TValue>({
  title,
  columns,
  data,
  count,
  pageSize,
  showSortBy = true,
  showDateRange = false,
  showSearch = true,
  sortOptions = [],
  showFooter = true,
  wideRows = false,
  // setPageSize,
  refresh,
  manualPagination = false,
  onPageChange,
  pageIndex = 0,
  searchValue = "",
  onSearchChange,
  isSearching = false,
  onSortChange,
  dateRange,
  onDateRangeChange,
  filterOptions = [],
  filterValue,
  onFilterChange,
  showFilter = false,
}: {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  pageSize?: number;
  showSortBy?: boolean;
  showDateRange?: boolean;
  showSearch?: boolean;
  sortOptions?: { key: string; value: string }[];
  showFooter?: boolean;
  wideRows?: boolean;
  // setPageSize: (size: number) => void;
  refresh: () => Promise<void>;
  manualPagination?: boolean;
  onPageChange?: (page: number) => void;
  pageIndex?: number;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isSearching?: boolean;
  onSortChange?: (value: string) => void;
  dateRange?: DateRange | undefined;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  filterOptions?: { label: string; value: string }[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  showFilter?: boolean;
}) {
  const [sortValue, setSortValue] = useState("");
  // const [internalDateRange, setInternalDateRange] = useState<DateRange | undefined>(); // Helper if we wanted uncontrolled support
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize ?? count,
  });

  const pagination = manualPagination
    ? { pageIndex, pageSize: pageSize ?? 10 }
    : internalPagination;

  // console.log(pageSize);
  const table = useReactTable({
    data,
    columns,
    rowCount: count,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setInternalPagination,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  // const getLastIndex = useMemo(() => {
  //   const rowCount = table.getRowCount();

  //   return pagination.pageSize * (pagination.pageIndex + 1) < rowCount
  //     ? pagination.pageSize * (pagination.pageIndex + 1)
  //     : rowCount;
  //   // }, [table, pagination.pageSize, pagination.pageIndex]);

  return (
    <div className="w-full mx-auto border border-grey-200 rounded-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-y-4">
        <div>
          <h2 className="h6-medium">{title}</h2>
          {!showSearch && (
            <div className="relative flex-1 md:flex-none">
              <Icon
                icon="hugeicons:search-01"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252]"
              />
              <Input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 w-full border-[#8D8D8D]"
              />
              {isSearching && (
                <Icon
                  icon="hugeicons:loading-03"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252] animate-spin"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex w-full md:w-fit flex-wrap justify-center md:justify-end items-center gap-3">
          <Button
            variant="outline"
            className="border-[#8D8D8D] text-black py-2.5"
            onClick={async () => await refresh()}
          >
            <Icon icon="hugeicons:arrow-reload-horizontal" />
          </Button>

          {showDateRange && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"md"}
                  className="gap-2 border-[#8D8D8D] text-black"
                >
                  Select date range
                  <Icon icon={"iconoir:nav-arrow-down-solid"} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                />
              </PopoverContent>
            </Popover>
          )}

          {showFilter && (
            <Select
              value={filterValue}
              onValueChange={(val) => onFilterChange?.(val)}
            >
              <SelectTrigger className="w-fit gap-2 border-[#8D8D8D] text-black">
                <span>Filter</span>
                <Icon icon="hugeicons:filter-horizontal" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showSortBy && (
            <div className="relative">
              {sortValue && (
                <Button
                  type="reset"
                  variant="ghost"
                  size="sm"
                  className="absolute top-1/2 -translate-y-1/2 right-8"
                  onClick={() => {
                    if (sortValue) {
                      setSortValue("");
                      table.resetSorting();
                    }
                  }}
                >
                  <Icon icon={"hugeicons:multiplication-sign"} />
                </Button>
              )}

              <Select
                value={sortValue}
                onValueChange={(val) => {
                  setSortValue(val);

                  if (val !== "") {
                    // table.setSorting(() => [{ id: val, desc: false }]);
                    if (onSortChange) {
                      onSortChange(val);
                    }
                  }
                }}
              >
                <SelectTrigger showFilledIcon className="w-40 border-[#8D8D8D]">
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
            </div>
          )}

          {showSearch && (
            <div className="relative flex-1 md:flex-none">
              <Icon
                icon="hugeicons:search-01"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252]"
              />
              <Input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 w-full border-[#8D8D8D]"
              />
              {isSearching && (
                <Icon
                  icon="hugeicons:loading-03"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#525252] animate-spin"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="">
        <Table>
          <TableHeader className="bg-grey text-black-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="first:pl-4 body-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="[&_tr:first-of-type_td]:pt-5">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "border-none hover:bg-grey-100",
                    wideRows ? "[&_td]:py-4" : "[&_td]:py-2",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="first:pl-4">
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

      {showFooter && (
        <div className="mt-2 text-black bg-[#F7F7F7] border-t border-[#E0E0E0] flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1 border-r border-[#E0E0E0]">
            <span className="text-sm">Items per page:</span>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={(val) => {
                const newSize = Number.parseInt(val);
                const [whole, frac] = (count / newSize)
                  .toFixed(1)
                  .split(".")
                  .map((n) => Number.parseInt(n));
                console.log(whole, frac);
                const newIndex = frac > 0 ? whole + 1 - 1 : whole - 1;

                setInternalPagination({ pageIndex: newIndex, pageSize: newSize });
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
          <div className="flex items-center">
            <div className="border-r border-[#e0e0e0] h-full py-1 px-4 text-sm w-fit text-nowrap">
              {pagination.pageIndex * pagination.pageSize + 1}-
              {pagination.pageSize * (pagination.pageIndex + 1) < count
                ? pagination.pageSize * (pagination.pageIndex + 1)
                : count}{" "}
              of {count} items
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => {
                    if (manualPagination && onPageChange) {
                      onPageChange(pagination.pageIndex - 1);
                    } else {
                      table.previousPage();
                    }
                  }}
                >
                  <Icon icon="hugeicons:arrow-left-01" />
                </Button>
                <Button
                  variant="ghost"
                  className="text-black h-8 w-8 border-l rounded-none border-[#e0e0e0]"
                  disabled={!table.getCanNextPage()}
                  onClick={() => {
                    if (manualPagination && onPageChange) {
                      onPageChange(pagination.pageIndex + 1);
                    } else {
                      table.nextPage();
                    }
                  }}
                >
                  <Icon icon="hugeicons:arrow-right-01" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
