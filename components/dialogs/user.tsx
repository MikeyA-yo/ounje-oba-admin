import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export const UserPopover = () => {
  return (
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
            <h3 className="text-lg font-semibold text-black mb-2">
              Ralph Edwards
            </h3>
            <p className="caption text-grey-900">Admin</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Account Section */}
        <div className="border-b pb-4 border-grey-200">
          <h4 className="caption text-black-400 mb-1">Account</h4>

          <div className="space-y-2 body-3-medium">
            {/* Profile Menu Item */}
            <Button
              asChild
              variant={"ghost"}
              className="w-full flex items-center gap-3 py-2 px-2 justify-start text-black"
            >
              <Link href={""}>
                <Icon icon="hugeicons:user" />
                <span className="">Profile</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={"ghost"}
              className="w-full flex items-center gap-3 py-2 px-2 justify-start text-black"
            >
              <Link href={"/admin"}>
                <Icon icon="hugeicons:user-multiple" />
                <span className="">Admin Management</span>
              </Link>
            </Button>

            {/* Settings Menu Item */}
            <Button
              asChild
              variant={"ghost"}
              className="w-full flex items-center gap-3 py-2 px-2 justify-start text-black"
            >
              <Link href={""}>
                <Icon icon="hugeicons:settings-01" />
                <span className="">Settings</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="">
          <LogoutDialog>
            <Button
              variant={"ghost"}
              className="w-full flex items-center gap-3 py-2 px-1 justify-start text-error hover:text-error-300"
            >
              <Icon icon="hugeicons:logout-02" />
              <span className="">Logout</span>
            </Button>
          </LogoutDialog>
        </div>
      </div>
    </div>
  );
};

function LogoutDialog({ children }: { children: React.ReactNode }) {
  const logout = useAuthStore((state) => state.logout);
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="text-center space-y-3">
          <AlertDialogTitle className="text-xl font-semibold text-grey-900">
            Are you Logging out?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-grey-600">
            You can always log back at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 mt-6">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
