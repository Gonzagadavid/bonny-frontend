"use client";

import React from "react";
import AnimalCard from "./_components/animalCard";

interface Animal {
  id: number;
  name: string;
  photoUrl: string;
  age: string;
  species: string;
  status: "Apadrinhado" | "Adotado" | "Disponível";
  entryDate: string;
}

const dogs: Animal[] = [
  {
    id: 1,
    name: "Leão",
    photoUrl: "/images/leao.jpg",
    age: "5 anos",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2024-11-15",
  },
  {
    id: 2,
    name: "Max",
    photoUrl: "/images/max.jpg",
    age: "1 ano",
    species: "Cachorro",
    status: "Adotado",
    entryDate: "2024-12-20",
  },
  {
    id: 3,
    name: "Bolt",
    photoUrl: "/images/bolt.jpg",
    age: "3 meses",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2025-01-10",
  },
  {
    id: 4,
    name: "Thor",
    photoUrl: "/images/thor.jpg",
    age: "2 anos e 6 meses",
    species: "Cachorro",
    status: "Apadrinhado",
    entryDate: "2025-02-01",
  },
  {
    id: 5,
    name: "Buddy",
    photoUrl: "/images/buddy.jpg",
    age: "7 anos",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2024-10-01",
  },
  {
    id: 6,
    name: "Rex",
    photoUrl: "/images/rex.jpg",
    age: "1 ano e 2 meses",
    species: "Cachorro",
    status: "Adotado",
    entryDate: "2025-03-05",
  },
  {
    id: 7,
    name: "Luna",
    photoUrl: "/images/luna.jpg",
    age: "4 meses",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2025-03-20",
  },
  {
    id: 8,
    name: "Rocky",
    photoUrl: "/images/rocky.jpg",
    age: "5 anos",
    species: "Cachorro",
    status: "Apadrinhado",
    entryDate: "2024-09-10",
  },
  {
    id: 9,
    name: "Fred",
    photoUrl: "/images/fred.jpg",
    age: "1 ano",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2025-04-01",
  },
  {
    id: 10,
    name: "Duke",
    photoUrl: "/images/duke.jpg",
    age: "6 meses",
    species: "Cachorro",
    status: "Adotado",
    entryDate: "2024-11-25",
  },
  {
    id: 11,
    name: "Bella",
    photoUrl: "/images/bella.jpg",
    age: "2 anos",
    species: "Cachorro",
    status: "Disponível",
    entryDate: "2025-03-10",
  },
];

export default function AnimalsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Animais</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dogs.map((dog) => (
          <AnimalCard key={dog.id} animal={dog} />
        ))}
      </div>
    </div>
  );
}
