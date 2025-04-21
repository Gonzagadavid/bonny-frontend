"use client";

import { Sidebar } from "./_components/sideBarAdmin";
import { Navbar } from "./_components/navBarAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full flex flex-col ">
        <Navbar />
        <main className="w-full  bg-white">{children}</main>
      </div>
    </div>
  );
}
