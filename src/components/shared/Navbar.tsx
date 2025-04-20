"use client";

import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import LogoutButton from "../custom/logoutButton";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 left-64 z-10 bg-white border-b h-16 flex items-center justify-end p-6">
      <div className="flex-grow text-lg font-semibold">
        Painel Administrativo
      </div>
      <button className="mr-4">
        <Bell size={20} />
      </button>
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
