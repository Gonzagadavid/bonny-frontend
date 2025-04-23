'use client'

import { helpOptions } from "@/data/help";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HelpOptions = () => {
  return (
    <div className="w-full bg-[var(--color-light-orange)] relative">
      {/* Divisor superior estilizado */}
      <div className="w-full h-12 -mb-1 transform">
        <img 
          src="/images/path/waves.svg" 
          alt="Divisor decorativo" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Seção principal */}
      <section className="container mx-auto px-4 pb-16">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Como Você Pode Ajudar
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Escolha uma das formas abaixo para contribuir com o nosso projeto e fazer a diferença na vida dos animais
          </p>
        </div>

        {/* Grid de opções */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpOptions.options.map((option, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/95 backdrop-blur-sm"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-[var(--color-light-orange)]/10 rounded-full mb-4">
                  <span className="text-3xl text-[var(--color-light-orange)]" role="img" aria-label={option.title}>
                    {option.icon}
                  </span>
                </div>
                <CardTitle className="text-xl text-gray-800">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{option.description}</p>
              </CardContent>
              <CardFooter className="justify-center">
              <Button 
                asChild
                className="bg-amber-600 hover:bg-amber-700 text-white hover:text-white focus:text-white active:text-white"
              >
                  <Link href={option.link}>
                    Saiba mais
                  </Link>
              </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpOptions;