import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Mail, Clock, Home, PawPrint, Info, Phone } from "lucide-react";
import { Instagram } from "lucide-react";
import { Routes } from "@/constants/routes";
import { PawPattern } from "./pawPattern";

export default function Footer() {
  return (
    <footer className="bg-[--color-red-orange] text-[--text-white] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
          {/* Sobre */}
          <div className="space-y-3 text-center md:text-left max-w-xs mx-auto md:mx-0">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <Image 
                src="/images/logotipo.webp" 
                alt="Logo Projeto Bonny"
                width={50}
                height={50}
                className="w-12 h-12 object-contain rounded-full border-2 border-amber-600"
              />
              <h3 className="text-lg font-bold">Projeto Bonny</h3>
            </div>
            <p className="text-[--text-white] text-sm">
              Resgatamos, cuidamos e encontramos lares amorosos para animais em
              situação de risco. Junte-se a nós e transforme vidas!
            </p>
            <div className="flex justify-center md:justify-start">
              <Button
                asChild
                className="bg-amber-600 hover:bg-amber-700 mt-3 text-sm"
              >
                <Link href={Routes.HELP}>Quero Ajudar</Link>
              </Button>
            </div>
          </div>

          {/* Navegação e Contato */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-12">
            {/* Navegação */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-md mb-3 flex items-center justify-center md:justify-start gap-2">
                <Heart className="w-6 h-6 text-amber-600" />
                Navegação
              </h4>
              <ul className="space-y-3">
                {[
                  { href: "/", icon: Home, text: "Início" },
                  { href: Routes.ADOPTION, icon: PawPrint, text: "Adotar" },
                  { href: Routes.ABOUT, icon: Info, text: "Sobre Nós" },
                  { href: Routes.CONTACT, icon: Heart, text: "Voluntariado" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-[--text-white] hover:text-white text-sm flex items-center justify-center md:justify-start gap-2"
                    >
                      <item.icon className="w-5 h-5" /> {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-md mb-3 flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-6 h-6  text-amber-600" />
                Contato
              </h4>

              <ul className="space-y-3 text-white text-sm">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-5 h-5 text-white" />
                  <span>projetobonny@gmail.com</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Instagram className="w-5 h-5 text-white" />
                  <Link
                    href="https://instagram.com/projetobonny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @projetobonny
                  </Link>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Clock className="w-5 h-5 text-white" />
                  <span>Seg-Sex: 8h às 16h | Sáb: 8h às 12h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-8 pt-6 border-t border-white border-opacity-20 text-center text-[--text-white] text-base">
          <p>© {new Date().getFullYear()} Projeto Bonny – Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}