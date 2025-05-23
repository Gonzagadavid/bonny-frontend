"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  PawPrint,
  Heart,
  Users,
  LayoutTemplate,
  LetterText,
} from "lucide-react";
import { Routes } from "@/constants/routes";

const navigation = [
  { href: Routes.ADMIN_ANIMALS, label: "Animais", icon: PawPrint },
  { href: Routes.ADMIN_ADOPTION, label: "Adoções", icon: Heart },
  { href: Routes.ADMIN_USERS, label: "Usuários", icon: Users },
  { href: Routes.ADMIN_FORMS, label: "Formulários", icon: LetterText },
  { href: Routes.HOME, label: "Plataforma", icon: LayoutTemplate },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 hidden md:flex flex-col w-64 border-r bg-gray-50 h-full">
      <div className="p-6 flex-shrink-0">
        <Link href="/admin/dashboard" className="font-semibold text-lg">
          Painel Admin
        </Link>
      </div>
      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                pathname === item.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
