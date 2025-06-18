import { SectionHeader } from "@/components/layout/section-header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <SectionHeader />
      {children}
    </div>
  );
}
