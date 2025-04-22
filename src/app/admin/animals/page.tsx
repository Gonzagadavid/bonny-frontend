import React from "react";
import AnimalCard from "./_components/animalCard";
import { listAnimal } from "./_lib/listAnimals";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export default async function AnimalsPage() {
  const animals = await listAnimal();
  return (
    <div className="mb-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Animais</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animals.map((dog) => (
          <AnimalCard key={dog._id} animal={dog} />
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
