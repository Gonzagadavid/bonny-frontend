"use client";

import Link from "next/link";
import Image from "next/image";
import { Routes, routesInfo } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import LogoutButton from "./logoutButton";
import { useEffect, useState } from "react";
import { checkPermissions, UserRole } from "@/constants/permissions";
import { HeartHandshake } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyToClipboard } from "./copyToClipboard";

const Header = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const session = useSession();

  const mainRoutes = [
    Routes.ABOUT,
    Routes.ADOPTION,
    Routes.HELP,
    Routes.CONTACT,
  ];

  const isAdmin =
    !!session.data?.user.role &&
    checkPermissions(UserRole.VOLUNTEER, session.data.user.role);

  if (session.status === "authenticated") {
    mainRoutes.push(Routes.DASHBOARD);
  }

  if (isAdmin) {
    mainRoutes.push(Routes.ADMIN);
  }

  useEffect(() => {
    session.update();
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 px-4 py-3 shadow-md flex items-center justify-between font-montserrat">
      <div className="flex items-center mr-6">
        <Link href={Routes.HOME}>
          <Image
            src="/images/logotipo-bonny.svg"
            alt="Logo Bonny"
            width={80}
            height={80}
            className="hover:opacity-90 transition-opacity"
            priority
          />
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        {mainRoutes.map((route) => (
          <Link
            key={route}
            href={route}
            className="text-gray-700 text-sm font-medium hover:text-accent transition-colors duration-200"
          >
            {routesInfo[route].label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-3">
        <Dialog
          open={isDonationModalOpen}
          onOpenChange={setIsDonationModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-[var(--color-coral-red)] text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-md shadow-lg transition-all animate-pulse hover:animate-none"
            >
              <HeartHandshake className="w-5 h-5" />
              Doar
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Faça uma doação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-2 bg-white rounded-lg border border-gray-200">
                  <Image
                    src="/images/pix-qrcode.png"
                    alt="QR Code PIX"
                    width={200}
                    height={200}
                    className="w-full max-w-[200px] h-auto"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-center mb-2">
                    Chave PIX (Email):
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm">
                      projetobonny@gmail.com
                    </code>
                    <CopyToClipboard text="projetobonny@gmail.com" />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>Toda doação nos ajuda a resgatar mais animais!</p>
                  <p className="mt-1">
                    Projeto Bonny - CNPJ: 47.641.646/0001-11
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {session.status === "authenticated" ? (
          <LogoutButton />
        ) : (
          <Button
            asChild
            variant="default"
            className="bg-amber-600 hover:bg-amber-700 transition-colors"
          >
            <Link href={Routes.LOGIN}>{routesInfo[Routes.LOGIN].label}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
