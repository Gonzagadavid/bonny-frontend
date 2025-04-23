"use client";

import { Instagram } from "lucide-react";
import Link from "next/link";

const InstagramFloatingButton = () => {
  return (
    <Link
      href="https://instagram.com/projetobonny"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram do Projeto Bonny"
      className="fixed bottom-4 right-4 z-50 bg-[var(--color-coral-red)] text-white p-3 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-all"
    >
      <Instagram className="w-5 h-5" />
    </Link>
  );
};

export default InstagramFloatingButton;
