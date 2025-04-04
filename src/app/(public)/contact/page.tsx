import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Routes } from '../constants/routes';

import Header from "@/components/custom/Header";

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    description: "contato@abrigoanimal.com",
    action: "Envie um email"
  },
  {
    icon: "📞",
    title: "Telefone",
    description: "(11) 98765-4321",
    action: "Ligue agora"
  },
  {
    icon: "📍",
    title: "Endereço",
    description: "Rua dos Animais, 123 - São Paulo/SP",
    action: "Ver no mapa"
  }
];

const faqs = [
  {
    question: "Quais são os horários de visita?",
    answer: "Terça a domingo, das 10h às 16h."
  },
  {
    question: "Preciso agendar para conhecer os animais?",
    answer: "Sim, pedimos que agende com antecedência para melhor atendimento."
  },
  {
    question: "Como posso ajudar além de doações?",
    answer: "Precisamos de voluntários para passeios, banhos e eventos."
  }
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="container mx-auto py-12 px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Fale Conosco
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para responder suas dúvidas e ouvir suas sugestões
          </p>
        </section>

        {/* Métodos de Contato */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Nossos Canais
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
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

        {/* Formulário de Contato */}
        <section className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Envie sua Mensagem
          </h2>
          
          <Card className="p-6">
            <form>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2">Nome</label>
                  <Input id="name" placeholder="Seu nome completo" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <Input id="email" type="email" placeholder="seu@email.com" required />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2">Assunto</label>
                <Input id="subject" placeholder="Sobre o que deseja falar?" required />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">Mensagem</label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder="Escreva sua mensagem aqui..." 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </>
  );
}