import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Projeto Bonny</h3>
            <p>
              O <b>Projeto Bonny</b> resgata, cuida e encontra lares amorosos
              para animais em situação de risco. Junte-se a nós e transforme
              vidas!
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <p>
              <b>Email:</b> projetobonny@gmail.com
            </p>
            <p>
              <b>Instagram:</b> @projetobonny
            </p>
            <p>
              <b>Horário:</b> segunda a sexta (8h às 16h) - sábado (8h às 12h) -
              domingo (fechado)
            </p>
          </div>
          <div>
            <Button asChild variant="link" className="text-white">
              <Link href="#top">Volte ao início</Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© 2024 Projeto Bonny – Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
