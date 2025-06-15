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
  const route = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border py-5 h-24">
        <div className="mx-auto">
          <Image src="/logo.png" alt="Ounje Oba logo" width={50} height={50} />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-8 px-6">
        <ul className="space-y-2">
          {data.map((item) => (
            <li
              key={item.name}
              className={cn(
                "flex flex-row items-center gap-4 text-black-500 p-4 rounded-lg",
                route === item.url && "bg-primary text-white",
              )}
            >
              <Icon icon={item.icon} />
              <Link href={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
