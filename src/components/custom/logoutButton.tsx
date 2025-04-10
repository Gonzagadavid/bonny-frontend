"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton({}: { logoutCallback: () => void }) {
  return (
    <Button
      variant="outline"
      className="border-accent text-accent hover:bg-accent/10"
      onClick={() => signOut()}
    >
      SAIR
    </Button>
  );
}
