import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import Image from "next/image";
import { PawPattern } from "@/components/custom/background/pawPattern";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden bg-gradient-to-r from-[#F4923A] to-[#c03619]">

    <PawPattern />

       {/* Imagem do cachorro */}
       <div className="absolute left-0 bottom-0 w-1/2 h-full overflow-hidden z-0">
        <Image
          src="/images/dog-hero2.png"
          alt="Cachorro para adoção"
          layout="fill"
          objectFit="cover"
          objectPosition="left -20%"
          className="scale-150"
        />
      </div>

      {/* Overlay escuro para melhor contraste do texto */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 flex justify-end items-center h-full z-20">
        {/* Texto à direita */}
        <div className="w-full md:w-1/2 text-white text-right space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold">
            Apoie a Causa
          </h1>
          <p className="text-lg md:text-xl">
            Adotar é um ato de amor. Dê um lar, ganhe um amigo para a vida toda.
          </p>
          <div className="flex gap-4 justify-end">
          <Button 
              asChild 
              className="bg-amber-600 hover:bg-amber-700 text-white hover:text-white focus:text-white active:text-white transition-colors">
              <Link href={Routes.ADOPTION}>Ver Animais</Link>
            </Button>
            <Button 
              asChild 
              className="bg-amber-600 hover:bg-amber-700 text-white hover:text-white focus:text-white active:text-white transition-colors">
              <Link href={Routes.HELP}>Como Ajudar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}