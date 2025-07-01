"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { data } from "@/data/routes";

export function AppSidebar() {
  const pathname = usePathname();

  function isActive(url: string) {
    if (url === "/") {
      return pathname === "/";
    } else if (url !== "/") {
      return pathname.startsWith(url);
    }
  }
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border py-5 h-24">
        <div className="mx-auto" lang="yr">
          <Image src="/logo.png" alt="Ounje Oba logo" width={50} height={50} />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-8 px-6">
        <ul className="space-y-2">
          {data.map((item) => (
            <li
              key={item.name}
              className={cn(
                "flex flex-row items-center gap-4 text-black-500 p-4 rounded-lg hover:text-primary",
                isActive(item.url) && "bg-primary text-white",
              )}
            >
              <Link
                href={item.url}
                className="flex items-center gap-2 w-full h-full"
              >
                <Icon icon={item.icon} fontSize={"18px"} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
