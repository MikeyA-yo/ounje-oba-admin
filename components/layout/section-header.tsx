"use client";

import { data } from "@/data/routes";
import { usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Icon } from "@iconify/react";

export const SectionHeader = () => {
  const route = usePathname();

  return (
    <div className="flex flex-row flex-nowrap justify-between items-center">
      <h1 className="text-3xl font-bold self-baseline">
        {data.find((item) => item.url === route)?.name}
      </h1>

      <Dialog>
        <DialogTrigger className="flex flex-row flex-nowrap items-center gap-2 font-medium border border-primary text-primary p-3 rounded-lg">
          <Icon icon="hugeicons:download-04" />
          Export
          <Icon icon="hugeicons:arrow-down-01" />
        </DialogTrigger>
      </Dialog>
    </div>
  );
};
