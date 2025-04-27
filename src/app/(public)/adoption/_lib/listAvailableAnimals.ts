import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface AnimalData {
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

export const listAvailableAnimals = async (): Promise<AnimalData[]> => {
  const availableAnimals = await fetcher(`${BackendRoutes.ANIMALS}/available`);
  return availableAnimals;
};
