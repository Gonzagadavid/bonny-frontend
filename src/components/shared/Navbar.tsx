'use client';

import { useSession, signOut } from 'next-auth/react';
import { Bell } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-10 bg-white border-b h-16 flex items-center justify-end px-6">
      <div className="flex-grow text-lg font-semibold">Painel Administrativo</div>
      <button className="mr-4">
        <Bell size={20} />
      </button>
      {session?.user ? (
        <div className="flex items-center space-x-2">
          <span>{session.user?.name}</span>
          <button onClick={() => signOut()} className="text-sm text-gray-500 hover:text-gray-700">
            Sair
          </button>
        </div>
      ) : (
        <span className="text-gray-500">Não autenticado</span>
      )}
    </div>
  );
}