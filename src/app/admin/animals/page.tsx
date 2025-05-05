import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import { listAnimal } from "./_lib/listAnimals";
import FilterButton from "./_components/filterButton";
import AnimalCard from "./_components/animalCard";

export default async function AnimalsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const showOnlyAvailable = (await searchParams).available === "true";
  const allAnimals = await listAnimal();
  const animals = showOnlyAvailable
    ? allAnimals.filter((animal) => animal.available === true)
    : allAnimals;

  return (
    <div className="mb-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Animais</h1>

      <div className="mb-6">
        <FilterButton currentFilter={showOnlyAvailable} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal._id} animal={animal} />
        ))}
      </div>

      <Button className="fixed bottom-10 right-10">
        <Link href={Routes.ADMIN_ANIMALS_REGISTER}>
          Adicionar um novo animal
        </Link>
      </Button>
    </div>
  );
}
