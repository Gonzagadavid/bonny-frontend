import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HelpSection() {
  const helpOptions = ["Doações", "Adoção", "Apadrinhamento", "Voluntariado"];

  return (
    <section className="container mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Como ajudar?</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {helpOptions.map((item) => (
          <Button key={item} asChild variant="outline" className="border-amber-600 text-amber-600">
            <Link href={`${Routes.HOW_TO_HELP}#${toId(item)}`}>{item}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
