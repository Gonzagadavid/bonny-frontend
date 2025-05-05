"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Animal } from "../_lib/listAnimals";
import Link from "next/link";
import { Routes } from "@/constants/routes";

interface AnimalCardProps {
  animal: Animal;
}

function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Card className="overflow-hidden rounded-md shadow-md cursor-pointer relative">
      <CardHeader>
        {animal.available && (
          <span className="absolute top-2 right-2 inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-green-600 hover:bg-green-700 shadow-md hover:scale-105">
            Disponível
          </span>
        )}
      </CardHeader>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={animal.imageProfile}
          alt={animal.name}
          fill
          className="object-cover"
        />
      </AspectRatio>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{animal.name}</h3>
        <p className="text-sm text-muted-foreground">{animal.breed}</p>
        <p className="text-sm text-muted-foreground">
          {animal.age} {animal.age === 1 ? "ano" : "anos"}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button variant="outline" size="sm">
          <Link href={`${Routes.ADMIN_ANIMALS}/animal-details/${animal._id}`}>
            Ver Detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AnimalCard;
