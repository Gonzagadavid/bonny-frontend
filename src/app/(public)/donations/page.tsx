// src/app/doacoes/page.tsx
import { donationData } from "@/data/donations";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DonationsPage() {
  return (

    <div className="container mx-auto py-12 px-4">
      {/* Seção PIX */}
      <section className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-6">Faça sua doação</h1>
        <p className="text-lg mb-8">
          Sua contribuição ajuda diretamente nos cuidados com nossos animais.
        </p>
      </section>

      {/* Custos Fixos */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">
          Veja como seu dinheiro é utilizado
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {donationData.fixedCosts.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-green-600">{item.item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">{item.cost}</p>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}