"use client";

import { Navbar } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth-store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hasMounted, setHasMounted] = useState(false);
  const hydrated = useAuthStore((state) => state.hydrated);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, hydrated]);

  if (!hasMounted) return null;

  if (!hydrated && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 color="#00B894" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="@container/main w-full h-full pb-12">
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
