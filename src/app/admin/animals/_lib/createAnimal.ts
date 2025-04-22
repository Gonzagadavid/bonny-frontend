"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export interface CreateAnimalData {
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

export async function createAnimal(
  createAnimalData: CreateAnimalData,
): Promise<void> {
  await sendRequest(BackendRoutes.ANIMALS, { arg: { data: createAnimalData } });
}
