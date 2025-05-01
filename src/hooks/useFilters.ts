import { useEffect, useState } from "react";

interface Pet {
  id: string;
  name: string;
  breed: string;
  size: string;
  fellColor: string;
  age: number;
  gender: string;
  imageProfile?: string;
  history?: string;
}

export function useFilters(pets: Pet[]) {
  const [searchName, setSearchName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);

  useEffect(() => {
    let result = [...pets];

    if (searchName) {
      result = result.filter((pet) =>
        pet.name.toLowerCase().includes(searchName.toLowerCase()),
      );
    }
    if (selectedSize) {
      result = result.filter((pet) => pet.size === selectedSize);
    }
    if (selectedBreed) {
      result = result.filter((pet) => pet.breed === selectedBreed);
    }
    if (selectedColor) {
      result = result.filter((pet) => pet.fellColor === selectedColor);
    }

    setFilteredPets(result);
  }, [searchName, selectedSize, selectedBreed, selectedColor, pets]);

  function clearFilters() {
    setSearchName("");
    setSelectedSize("");
    setSelectedBreed("");
    setSelectedColor("");
  }

  const sizes = [...new Set(pets.map((pet) => pet.size))];
  const breeds = [...new Set(pets.map((pet) => pet.breed))];
  const fellColors = [
    ...new Set(pets.map((pet) => pet.fellColor).filter(Boolean)),
  ];

  return {
    searchName,
    selectedSize,
    selectedBreed,
    selectedColor,
    setSearchName,
    setSelectedSize,
    setSelectedBreed,
    setSelectedColor,
    filteredPets,
    clearFilters,
    sizes,
    breeds,
    fellColors,
  };
}
