"use client";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useSidebar } from "../ui/sidebar";

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      onClick={toggleSidebar}
      className="bg-grey shadow-none"
      size={"icon"}
    >
      <Icon icon="hugeicons:sidebar-left" className="text-black" />
    </Button>
  );
};
