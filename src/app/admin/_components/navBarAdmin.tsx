"use client";

import { useSession } from "next-auth/react";
import LogoutButton from "../../../components/custom/logoutButton";
import { DrawerMenu } from "@/components/custom/drawerMenu";
import { Routes } from "@/constants/routes";

const adminRoutes = [
  Routes.ADMIN_ANIMALS,
  Routes.ADMIN_ADOPTION,
  Routes.ADMIN_USERS,
  Routes.ADMIN_FORMS,
  Routes.HOME,
];

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 left-64 z-10 bg-white border-b h-16 flex items-center justify-between p-6">
      <DrawerMenu routes={adminRoutes} />
      <div className="hidden flex-grow text-lg font-semibold">
        Painel Administrativo
      </div>
      {session?.user ? (
        <div className="flex items-center space-x-2">
          <span>{session.user?.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <span className="text-gray-500">Não autenticado</span>
      )}
    </div>
  );
}
