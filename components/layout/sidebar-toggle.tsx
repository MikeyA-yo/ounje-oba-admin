"use client";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { useSidebar } from "../ui/sidebar";

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant={"ghost"} onClick={toggleSidebar} className="bg-grey">
      <Icon icon="hugeicons:sidebar-left" className="text-black" />
    </Button>
  );
};
