"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface Animal {
  _id: string;
  name: string;
  age: number;
  size: string;
  breed: string;
  fellColor: string;
  fell: string;
  temperament: string;
  situation: string;
  history: string;
  imageProfile: string;
  images: string[];
  available: boolean;
}

export const listAnimal = async (): Promise<Animal[]> => {
  const animals = await fetcher(BackendRoutes.ANIMALS);

  return animals;
};
