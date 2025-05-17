import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Routes, routesInfo } from "@/constants/routes";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DrawerMenu({ routes }: { routes: Routes[] }) {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <MenuIcon className="md:hidden flex" />
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader className="justify-end">
          <DrawerClose asChild>
            <X />
          </DrawerClose>
        </DrawerHeader>
        <DrawerTitle className="flex justify-center">
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
        </DrawerTitle>
        <ul className="p-8">
          {routes.map((route) => (
            <li key={route}>
              <p className="p-3">
                <DrawerClose asChild>
                  <Link
                    href={route}
                    className="flex text-gray-700 text-sm font-medium hover:text-accent transition-colors duration-200"
                  >
                    {routesInfo[route]?.icon ?? ""}
                    <span className="ml-2">{routesInfo[route].label}</span>
                  </Link>
                </DrawerClose>
              </p>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
