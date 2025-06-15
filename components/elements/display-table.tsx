import { RefreshCw, Filter, Search } from "lucide-react";
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

export const DisplayTable = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto border border-border rounded-md">
      <div className="flex items-center justify-between px-4 py-6">
        <h1 className="text-2xl font-medium">{title}</h1>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-[#8D8D8D]">
            <Icon icon="hugeicons:arrow-reload-horizontal" />
          </Button>

          <Button variant="outline" className="gap-2 border-[#8D8D8D]">
            Filter
            <Icon icon="hugeicons:filter-horizontal" />
          </Button>

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

          <div className="relative">
            <Icon
              icon="hugeicons:search-01"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#525252]"
            />
            <Input
              placeholder="Search"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 border-[#8D8D8D]"
            />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};
