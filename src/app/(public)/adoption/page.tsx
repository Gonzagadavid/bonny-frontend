import { listAvailableAnimals } from "./_lib/listAvailableAnimals";
import { PawPattern } from "@/components/custom/background/pawPattern";
import { AlertTriangle } from "lucide-react";
import FooterAdoption from "./_components/footerAdoption";
import { Routes } from "@/constants/routes";
import { dogSizeLabel, genderLabel } from "../../../constants/labels";
import SearchFilters from "./_components/searchFilters";
import PetCard from "./_components/petCard";
import NoResults from "./_components/noResults";

export default async function AdoptionPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{
    name?: string;
    size?: string;
    breed?: string;
    color?: string;
  }>;
}) {
  const searchParams = await searchParamsPromise;

  const pets = await listAvailableAnimals();

  let filteredPets = [...pets];

  if (searchParams.name) {
    filteredPets = filteredPets.filter((pet) =>
      pet.name.toLowerCase().includes(searchParams.name!.toLowerCase()),
    );
  }

  if (searchParams.size) {
    filteredPets = filteredPets.filter((pet) => pet.size === searchParams.size);
  }

  if (searchParams.breed) {
    filteredPets = filteredPets.filter(
      (pet) => pet.breed === searchParams.breed,
    );
  }

  if (searchParams.color) {
    filteredPets = filteredPets.filter(
      (pet) => pet.fellColor === searchParams.color,
    );
  }

  const sizes = [...new Set(pets.map((pet) => pet.size))];
  const breeds = [...new Set(pets.map((pet) => pet.breed))];
  const fellColors = [
    ...new Set(pets.map((pet) => pet.fellColor).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4e4d0] to-white">
      <section
        className="relative flex items-center justify-center overflow-hidden py-24"
        style={{
          background: "radial-gradient(circle, #f4923a 0%, #d94545 100%)",
        }}
      >
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

      <section className="max-w-6xl mx-auto px-6 mb-16 -mt-10 relative z-20">
        <SearchFilters
          sizes={sizes}
          breeds={breeds}
          fellColors={fellColors}
          currentFilters={searchParams}
        />
      </section>

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

      <section className="max-w-6xl mx-auto px-6 pb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard
              key={pet._id}
              pet={pet}
              genderLabel={genderLabel}
              dogSizeLabel={dogSizeLabel}
              routes={Routes}
            />
          ))
        ) : (
          <NoResults />
        )}
      </section>

      <FooterAdoption />
    </div>
  );
}
