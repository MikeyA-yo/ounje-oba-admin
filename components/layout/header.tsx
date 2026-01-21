import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { SidebarToggle } from "./sidebar-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UserPopover } from "../dialogs/user";
import { Notifications } from "../dialogs/notifications";

// I will update app/(routes)/layout.tsx next. 
// For now, I'll update Header to accept the prop.
export const Navbar = ({ user, lowStockCount = 0 }: { user: any, lowStockCount?: number }) => {
  return (
    <header className="flex flex-row justify-end md:justify-between items-center border-b border-border px-8 h-24">
      <p className="hidden md:block">
        Hello {user?.full_name || user?.email || "Admin"}, you have{" "}
        <span className="bg-secondary-one-100 rounded-sm p-1">{lowStockCount}</span> products
        almost out of stock.
      </p>
      <div className="flex flex-row items-center gap-4 rounded-sm">
        <SidebarToggle />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="bg-grey">
              <Icon icon="hugeicons:notification-01" className="text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-96">
            <Notifications />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"ghost"}
              className="flex flex-row flex-nowrap items-center gap-2 text-black"
            >
              <Avatar>
                <AvatarFallback className="bg-[#777] text-white">
                  {user?.full_name?.[0] || user?.email?.[0] || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-row flex-nowrap items-center gap-2">
                <p>{user?.full_name || user?.email || "Admin"}</p>
                <Icon icon="hugeicons:arrow-down-01" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 mr-4">
            <UserPopover user={user} />
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
