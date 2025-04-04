import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-[url('/images/background-hero.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Adote um Amigo</h1>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/adocao">Ver Animais</Link>
          </Button>
          <Button variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="/como-ajudar">Como Ajudar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
