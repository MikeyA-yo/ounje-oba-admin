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

const sidebarItems = [
  {
    name: "Dashboard",
    url: "/",
    icon: <Icon icon="hugeicons:dashboard-square-02" />,
  },
  {
    name: "Product Management",
    url: "/products",
    icon: <Icon icon="hugeicons:tags" />,
  },
  {
    name: "Order Management",
    url: "/orders",
    icon: <Icon icon="hugeicons:delivery-box-01" />,
  },
  {
    name: "Customers",
    url: "/customers",
    icon: <Icon icon="hugeicons:user-multiple" />,
  },
  {
    name: "Transactions",
    url: "/transactions",
    icon: <Icon icon="hugeicons:arrow-data-transfer-horizontal" />,
  },
  {
    name: "Coupons",
    url: "/coupons",
    icon: <Icon icon="hugeicons:discount" />,
  },
  {
    name: "Reports",
    url: "/reports",
    icon: <Icon icon="hugeicons:analytics-03" />,
  },
];

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
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              className={cn(
                "flex flex-row items-center gap-4 text-black-500 p-4 rounded-lg",
                route === item.url && "bg-primary text-white",
              )}
            >
              {item.icon}
              <Link href={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
