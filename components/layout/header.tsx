import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { SidebarToggle } from "./sidebar-toggle";

export const Navbar = () => {
  return (
    <header className="flex flex-row justify-end md:justify-between items-center border-b border-border px-8 h-24">
      <p className="hidden md:block">
        Hello Ralph, you have{" "}
        <span className="bg-secondary-one-100 rounded-sm p-1">23</span> products
        almost out of stock.
      </p>
      <div className="flex flex-row items-center gap-4 rounded-sm">
        <SidebarToggle />
        <Button className="bg-grey shadow-none" size={"icon"}>
          <Icon icon="hugeicons:notification-01" className="text-black" />
        </Button>
        <Avatar>
          <AvatarFallback className="bg-[#777] text-white">RE</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
