"use client";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimalData, listAvailableAnimals } from "./_lib/listAvailableAnimals";
import { PawPattern } from "@/components/custom/background/pawPattern";
import { AlertTriangle } from "lucide-react";
import FooterAdoption from "./_components/footerAdoption";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";

export default function AdoptionPage() {
  const [availablePets, setAvailablePets] = useState<AnimalData[]>([]);
  const [filteredPets, setFilteredPets] = useState<AnimalData[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [searchName, setSearchName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchPets() {
      const pets = await listAvailableAnimals();
      setAvailablePets(pets);
      setFilteredPets(pets);
    }
    fetchPets();
  }, []);

  const filterPets = () => {
    let pets = [...availablePets];

    if (searchName) {
      pets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchName.toLowerCase()),
      );
    }
    if (selectedSize) {
      pets = pets.filter((pet) => pet.size === selectedSize);
    }
    if (selectedBreed) {
      pets = pets.filter((pet) => pet.breed === selectedBreed);
    }
    if (selectedColor) {
      pets = pets.filter((pet) => pet.fellColor === selectedColor);
    }

    setFilteredPets(pets);
  };

  useEffect(() => {
    filterPets();
  }, [searchName, selectedSize, selectedBreed, selectedColor, availablePets]);

  const sizes = [...new Set(availablePets.map((pet) => pet.size))];
  const breeds = [...new Set(availablePets.map((pet) => pet.breed))];
  const fellColors = [
    ...new Set(availablePets.map((pet) => pet.fellColor).filter(Boolean)),
  ];

  function clearFilters() {
    setSearchName("");
    setSelectedSize("");
    setSelectedBreed("");
    setSelectedColor("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4e4d0] to-white">
      {/* Seção Inicial */}
      <section
        className="relative flex items-center justify-center overflow-hidden py-24"
        style={{
          background: "radial-gradient(circle, #f4923a 0%, #d94545 100%)",
        }}
      >
        {/* Padrão de patinhas ao fundo */}
        <div className="absolute inset-0 z-0">
          <PawPattern />
        </div>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre seu amigo
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Cada animal merece um lar amoroso. Conheça nossos animais esperando
            por uma família.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="max-w-6xl mx-auto px-6 mb-16 -mt-10 relative z-20">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#f4e4d0]">
          <h2 className="text-xl font-semibold text-[#f4923a] mb-4">
            Filtrar por:
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
            />

            <select
              className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Porte</option>
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <select
              className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="">Raça</option>
              {breeds.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </select>

            <select
              className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Cor</option>
              {fellColors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>

            <Button
              variant="ghost"
              className="text-[#f4923a] hover:bg-[#dc7011]/10 text-sm"
              onClick={clearFilters}
            >
              Limpar filtros
            </Button>
          </div>
        </div>
      </section>

      {/* Mensagem de Aviso - Após os filtros */}
      <section className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <div className="flex items-center bg-[#f8d7da] border border-[#f5c6cb] rounded-lg p-4 shadow-lg">
          <AlertTriangle className="h-6 w-6 sm:h-5 sm:w-5 text-[#d42b2b] mr-3" />
          <p className="text-sm text-[#e44545] flex-1 text-center">
            As adoções são realizadas após <strong>entrevista</strong> e{" "}
            <strong>assinatura de termo de responsabilidade.</strong>
            <br />
            <span>
              Parte dos custos veterinários podem ser repassados para os
              adotantes.
            </span>
          </p>
        </div>
      </section>

      {/* Cartões de Pets */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet, index) => (
            <div
              key={pet._id}
              className={`transition-all duration-300 ease-in-out transform ${
                hoveredCard === index ? "scale-105 shadow-lg" : "scale-100"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full flex flex-col overflow-hidden bg-white border border-zinc-200 hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                <div className="h-52 relative">
                  <Image
                    src={pet.imageProfile}
                    alt={`Foto de ${pet.name}`}
                    fill
                    className="object-cover rounded-t-2xl"
                    priority={index < 3}
                  />
                </div>

                <div className="flex flex-col flex-grow p-5 space-y-3">
                  <h2 className="text-lg font-medium text-neutral-800">
                    {pet.name}
                  </h2>

                  <div className="text-sm text-neutral-500">
                    <p>
                      {pet.breed} • {pet.age} {pet.age === 1 ? "ano" : "anos"} •{" "}
                      {pet.gender}
                    </p>
                    <p>
                      {pet.fellColor} • {pet.size}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-3">
                    {pet.history}
                  </p>
                </div>

                <CardFooter className="justify-center p-4">
                  <Button
                    asChild
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Link href={`${Routes.ADOPTION}/${pet._id}`}>
                      Conheça {pet.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="relative w-full max-w-2xl h-96 mb-8">
              <Image
                src="/images/path/no-pets-found.svg"
                alt="Nenhum animal encontrado"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#f4923a]/70 text-lg text-center">
              Nenhum animal encontrado com esses critérios.
            </p>
          </div>
        )}
      </section>

      <FooterAdoption />
    </div>
  );
}
