import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    description: "projetobonny@gmail.com",
    action: "Envie um email",
  },
  {
    icon: "📞",
    title: "Redes Sociais",
    description: "@projetobonny",
    action: "Siga-nos",
  },
  {
    icon: "📍",
    title: "Endereço",
    description: "Guaratinguetá, São Paulo, Brasil",
    action: "Ver no mapa",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Fale Conosco</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Estamos aqui para responder suas dúvidas e ouvir suas sugestões
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Nossos Canais</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="text-center p-6 hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-4 block">{method.icon}</span>
              <CardTitle>{method.title}</CardTitle>
              <CardContent>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <Button variant="outline">{method.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
