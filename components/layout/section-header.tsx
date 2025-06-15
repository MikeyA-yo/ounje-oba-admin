"use client";

import { data } from "@/data/routes";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const SectionHeader = () => {
  const route = usePathname();
  const exports = [
    "Summary",
    "Top Selling Products",
    "Top Customers",
    "Revenue Trend",
    "Orders Trend",
    "Product Summary",
    "Recent Orders",
  ];

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center">
      <h1 className="text-3xl font-bold self-baseline">
        {data.find((item) => item.url === route)?.name}
      </h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="flex flex-row flex-nowrap items-center gap-2 font-medium border border-primary text-primary px-4 py-6 rounded-lg"
          >
            <Icon icon="hugeicons:download-04" />
            Export
            <Icon icon="hugeicons:arrow-down-01" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-row flex-nowrap items-center justify-between border-b border-border w-full py-2">
            <DialogTitle>
              <div className="text-xl">Export</div>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Export Dashboard
            </DialogDescription>

            <DialogClose asChild>
              <Button variant={"ghost"} size={"icon"} className="">
                <Icon
                  icon="hugeicons:cancel-01"
                  className="text-black text-xl"
                />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="space-y-4">
            {exports.map((exp, i) => (
              <Label
                key={i}
                htmlFor={exp}
                className="flex flex-row gap-3 font-normal items-center text-base"
              >
                <Checkbox id={exp} />
                <span>{exp}</span>
              </Label>
            ))}
          </div>
          <Button disabled className="mt-8">
            Export
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
