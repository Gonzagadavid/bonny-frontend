"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { DogFell, DogSize, GenderEnum } from "@/types/enums";

interface UserData {
  _id: string;
  name: string;
  email: string;
  birthDate: string;
  cellPhone: string;
  individualTaxpayerRegistry: string;
  role: string;
}

interface Dog {
  _id: string;
  name: string;
  age: number;
  size: DogSize;
  breed: string;
  fellColor: string;
  fell: DogFell;
  temperament: string;
  situation: string;
  history: string;
  imageProfile: string;
  images: string[];
  available: boolean;
  gender: GenderEnum;
}

export interface Adoption {
  dog: Dog;
  user: UserData;
  createdAt: Date;
  lastCheck: Date;
  deletedAt: Date;
  _id: string;
}

export const listAdoptions = async (): Promise<Adoption[]> => {
  const adoptions = await fetcher(BackendRoutes.ADOPTIONS);

  return adoptions;
};
