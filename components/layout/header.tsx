import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { SidebarToggle } from "./sidebar-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} className="bg-grey">
              <Icon icon="hugeicons:notification-01" className="text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <h1>Notifications</h1>
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
                  RE
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-row flex-nowrap items-center gap-2">
                <p>Ralph Edwards</p>
                <Icon icon="hugeicons:arrow-down-01" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 mr-4">
            <div className="w-full">
              {/* User Profile Header */}
              <div className="bg-grey p-4 pb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <Avatar>
                      <AvatarFallback className="bg-[#777] text-white">
                        RE
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      Ralph Edwards
                    </h3>
                    <p className="text-sm text-grey-900">Admin</p>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div className="p-6 pt-4 border-b border-grey-200">
                <h4 className="text-sm text-black-400 mb-4">Account</h4>

                <div className="space-y-1">
                  {/* Profile Menu Item */}
                  <Button
                    variant={"ghost"}
                    className="w-full flex items-center gap-3 py-2 px-1 justify-start text-black"
                  >
                    <Icon icon="hugeicons:user" />
                    <span className="font-medium">Profile</span>
                  </Button>

                  {/* Settings Menu Item */}
                  <Button
                    variant={"ghost"}
                    className="w-full flex items-center gap-3 py-2 px-1 justify-start text-black"
                  >
                    <Icon icon="hugeicons:settings-01" />
                    <span className="font-medium">Settings</span>
                  </Button>
                </div>
              </div>

              <div className="p-6 pt-4">
                <Button
                  variant={"ghost"}
                  className="w-full flex items-center gap-3 py-2 px-1 justify-start text-error hover:text-error-200"
                >
                  <Icon icon="hugeicons:logout-02" />
                  <span className="font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
