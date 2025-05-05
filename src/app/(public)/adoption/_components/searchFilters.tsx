"use client";

import { Button } from "@/components/ui/button";
import { dogSizeLabel } from "@/constants/labels";
import { DogSize } from "@/types/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SearchFiltersProps {
  sizes: DogSize[];
  breeds: string[];
  fellColors: string[];
  currentFilters: {
    name?: string;
    size?: string;
    breed?: string;
    color?: string;
  };
}

export default function SearchFilters({
  sizes,
  breeds,
  fellColors,
  currentFilters,
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const clearFilters = () => {
    router.push("/adoption");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#f4e4d0]">
      <h2 className="text-xl font-semibold text-[#f4923a] mb-4">
        Filtrar por:
      </h2>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Buscar por nome..."
          defaultValue={currentFilters.name || ""}
          onChange={(e) => {
            router.push(
              `/adoption?${createQueryString("name", e.target.value)}`,
            );
          }}
          className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
        />

        <select
          className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
          defaultValue={currentFilters.size || ""}
          onChange={(e) => {
            router.push(
              `/adoption?${createQueryString("size", e.target.value)}`,
            );
          }}
        >
          <option value="">Porte</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {dogSizeLabel[size]}
            </option>
          ))}
        </select>

        <select
          className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
          defaultValue={currentFilters.breed || ""}
          onChange={(e) => {
            router.push(
              `/adoption?${createQueryString("breed", e.target.value)}`,
            );
          }}
        >
          <option value="">Raça</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <select
          className="border border-[#f4e4d0] rounded-lg p-3 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#f4923a] transition"
          defaultValue={currentFilters.color || ""}
          onChange={(e) => {
            router.push(
              `/adoption?${createQueryString("color", e.target.value)}`,
            );
          }}
        >
          <option value="">Cor</option>
          {fellColors.map((color) => (
            <option key={color} value={color}>
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
  );
}
