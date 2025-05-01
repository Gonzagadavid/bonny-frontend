"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

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
  gender: string;
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
