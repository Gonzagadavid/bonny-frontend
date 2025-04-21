import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { listAvailableAnimals } from "./_lib/listAvailableAnimals";

export default async function AdoptionPage() {
  const availablePets = await listAvailableAnimals();
  return (
    <div className="bg-white">
      <section className="bg-amber-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Adoção Responsável</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Adotar é um ato de amor. Conheça nossos animais disponíveis e ofereça
          um lar cheio de carinho.
        </p>
      </section>

      <section className="container mx-auto py-12 px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {availablePets.map((pet, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={pet.imageProfile}
                alt={`Foto de ${pet.name}`}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{pet.name}</CardTitle>
              <p className="text-sm text-gray-600">{pet.age} anos</p>
              <p className="mt-2 text-gray-700">{pet.history}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Quero Adotar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
