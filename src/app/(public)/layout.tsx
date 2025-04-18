"use client";

import PublicHeader from "@/components/custom/PublicHeader";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
