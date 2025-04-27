"use client";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      variant="default"
      className="bg-amber-600 hover:bg-amber-700 transition-colors"
      onClick={() => {
        signOut();
      }}
    >
      SAIR
    </Button>
  );
}
