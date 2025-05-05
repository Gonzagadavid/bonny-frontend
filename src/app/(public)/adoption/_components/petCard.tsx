"use client";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AnimalData } from "../_lib/listAvailableAnimals";

interface PetCardProps {
  pet: AnimalData;
  genderLabel: Record<string, string>;
  dogSizeLabel: Record<string, string>;
  routes: {
    ADOPTION: string;
    [key: string]: string;
  };
}

export default function PetCard({
  pet,
  genderLabel,
  dogSizeLabel,
  routes,
}: PetCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`transition-all duration-300 ease-in-out transform ${hovered ? "scale-105 shadow-lg" : "scale-100"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white border border-zinc-200 hover:shadow-xl transition-shadow duration-300 rounded-2xl">
        <div className="h-52 relative">
          <Image
            src={pet.imageProfile || "/placeholder.svg"}
            alt={`Foto de ${pet.name}`}
            fill
            className="object-cover rounded-t-2xl"
            priority
          />
        </div>

        <div className="flex flex-col flex-grow p-5 space-y-3">
          <h2 className="text-lg font-medium text-neutral-800">{pet.name}</h2>

          <div className="text-sm text-neutral-500">
            <p>
              {pet.breed} • {pet.age} {pet.age === 1 ? "ano" : "anos"} •{" "}
              {genderLabel?.[pet.gender] ?? ""}
            </p>
            <p>
              Pelagem {pet.fellColor} • Porte {dogSizeLabel?.[pet.size] ?? ""}
            </p>
          </div>

          <p className="text-sm text-neutral-600 line-clamp-3">{pet.history}</p>
        </div>

        <CardFooter className="justify-center p-4">
          <Button
            asChild
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200"
          >
            <Link href={`${routes.ADOPTION}/${pet._id}`}>
              Conheça {pet.name}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
