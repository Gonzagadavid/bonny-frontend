"use client";

import Link from "next/link";
import Image from "next/image";
import { Routes, routesInfo } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import LogoutButton from "./logoutButton";
import { useEffect } from "react";
import { checkPermissions, UserRole } from "@/constants/permissions";

const Header = () => {
  const session = useSession();

  const mainRoutes = [
    Routes.ABOUT,
    Routes.ADOPTION,
    Routes.SPONSORSHIP,
    Routes.HELP,
    Routes.CONTACT,
  ];

  const isAdmin =
    !!session.data?.user.role &&
    checkPermissions(UserRole.VOLUNTEER, session.data.user.role);

  if (isAdmin) {
    mainRoutes.push(Routes.ADMIN);
  }

  useEffect(() => {
    session.update();
  }, []);

  return (
    <header className="bg-white p-4 flex justify-between items-center font-montserrat shadow">
      <div className="flex items-center mr-14">
        <Link href={Routes.HOME}>
          <Image
            src="/logotipo.webp"
            alt="Logo Bonny"
            width={80}
            height={80}
            className="hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6 items-center">
        {mainRoutes.map((route) => (
          <Link
            key={route}
            href={route}
            className="text-gray-700 hover:text-accent transition-colors text-sm font-medium"
          >
            {routesInfo[route].label}
          </Link>
        ))}
      </nav>

      <div className="flex space-x-3">
        <Button
          asChild
          variant="default"
          className="bg-accent hover:bg-accent/90"
        >
          <Link href={Routes.DONATIONS}>
            {routesInfo[Routes.DONATIONS].label}
          </Link>
        </Button>
        {session.status === "authenticated" ? (
          <LogoutButton />
        ) : (
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent/10"
          >
            <Link href={Routes.LOGIN}>{routesInfo[Routes.LOGIN].label}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
