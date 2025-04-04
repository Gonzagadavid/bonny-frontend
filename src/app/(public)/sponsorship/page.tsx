import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Routes } from "@/constants/routes";
import Header from "@/components/custom/Header";


const sponsorBenefits = [
  {
    icon: "💌",
    title: "Atualizações Mensais",
    description: "Receba fotos e relatórios sobre o seu afilhado"
  },
  {
    icon: "🏥",
    title: "Cobertura Veterinária",
    description: "Seu apoio financia consultas, vacinas e tratamentos"
  },
  {
    icon: "📅",
    title: "Visitas Agendadas",
    description: "Possibilidade de visitar seu afilhado periodicamente"
  }
];

const availablePets = [
  {
    id: 1,
    name: "Luna",
    age: "2 anos",
    breed: "SRD",
    description: "Resgatada com fratura na pata, agora totalmente recuperada!",
    image: "/pets/luna.jpg",
    monthlyCost: "R$ 120/mês"
  },
  {
    id: 2,
    name: "Thor",
    age: "4 anos",
    breed: "Pastor Alemão",
    description: "Idoso especial que precisa de medicação contínua",
    image: "/pets/thor.jpg",
    monthlyCost: "R$ 180/mês"
  }
];

export default function SponsorshipPage() {
  return (
    <>
      <Header />

    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Apadrinhe um Animal Especial
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transforme a vida de um animal resgatado com seu apoio mensal
        </p>
      </section>

      {/* Benefícios */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Vantagens de Apadrinhar
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sponsorBenefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">{benefit.icon}</span>
              <CardTitle>{benefit.title}</CardTitle>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Animais Disponíveis */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Conheça Nossos Candidatos
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {availablePets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <Image
                    src={pet.image}
                    alt={pet.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>{pet.name}</CardTitle>
                    <p className="text-gray-600">
                      {pet.breed} • {pet.age}
                    </p>
                  </CardHeader>
                  <CardContent className="p-0 mb-4">
                    <p>{pet.description}</p>
                  </CardContent>
                  <CardFooter className="p-0 flex justify-between items-center">
                    <span className="font-bold text-amber-600">
                      {pet.monthlyCost}
                    </span>
                    <Button asChild className="bg-amber-600 hover:bg-amber-700">
                      <Link href={Routes.LOGIN}>Quero Apadrinhar</Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-amber-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Como Funciona?</h2>
        <ol className="list-decimal list-inside max-w-md mx-auto text-left mb-6 space-y-2">
          <li>Escolha seu afilhado</li>
          <li>Cadastre-se em nosso sistema</li>
          <li>Inicie seu apoio mensal</li>
        </ol>
        <Button asChild variant="outline">
          <Link href={Routes.HELP}>Perguntas Frequentes</Link>
        </Button>
      </section>
    </div>
    </>
  );
}