"use client";

import Header from "@/components/custom/publicHeader";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
