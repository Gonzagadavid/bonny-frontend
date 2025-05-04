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
import Footer from "@/components/custom/footer";

export default function HowToHelpPage() {
  return (
    <div className="bg-white">
      <section
        className="relative h-64 md:h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${helpOptions.hero.backgroundImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {helpOptions.hero.title}
          </h1>
          <p className="mt-4 text-xl text-white/90">
            {helpOptions.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {helpOptions.options.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <span className="text-4xl" role="img" aria-label={option.title}>
                  {option.icon}
                </span>
                <CardTitle className="mt-2">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{option.description}</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild variant="outline" className="w-full">
                  <Link href={option.link}>Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {helpOptions.faqs.map((faq, index) => (
            <details
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <summary className="font-semibold">{faq.question}</summary>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
