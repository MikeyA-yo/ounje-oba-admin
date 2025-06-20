import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Icon } from "@iconify/react";

export const SummaryTable = ({
  title,
  showSortBy = true,
  children,
}: {
  title: string;
  showSortBy?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto border border-grey-200 rounded-md">
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-y-4">
        <h1 className="text-2xl font-medium">{title}</h1>

        <div className="flex w-full md:w-fit flex-wrap justify-center md:justify-end items-center gap-3">
          <Button
            variant="outline"
            size={"md"}
            className="border-[#8D8D8D] text-black"
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
            <Select defaultValue="sort-by">
              <SelectTrigger className="w-32 border-[#8D8D8D]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sort-by">Sort By</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          )}

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
        </div>
      </div>

      <div className="[&_.table-header]:bg-grey [&_.table-header]:text-black-500 [&_.table-header]:text-sm [&_.table-body-row]:border-none [&_.table-body-row:hover]:bg-grey-100 [&_.table-footer]:mt-2 [&_.table-footer]:text-black [&_.table-footer]:bg-[#F7F7F7] [&_.table-footer]:border-t [&_.table-footer]:border-[#E0E0E0]">
        {children}
      </div>
    </div>
  );
};
