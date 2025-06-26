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
            <h3 className="text-lg font-semibold text-black">Ralph Edwards</h3>
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
        <LogoutDialog>
          <Button
            variant={"ghost"}
            className="w-full flex items-center gap-3 py-2 px-1 justify-start text-error hover:text-error-200"
          >
            <Icon icon="hugeicons:logout-02" />
            <span className="font-medium">Logout</span>
          </Button>
        </LogoutDialog>
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
