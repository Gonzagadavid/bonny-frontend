import React from "react";
import AnimalCard from "./_components/animalCard";
import { listAnimal } from "./_lib/listAnimals";

export default async function AnimalsPage() {
  const animals = await listAnimal();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Animais</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animals.map((dog) => (
          <AnimalCard key={dog._id} animal={dog} />
        ))}
      </div>
    </div>
  );
}
