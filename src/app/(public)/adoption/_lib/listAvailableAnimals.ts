import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { DogFell, DogSize, GenderEnum } from "@/types/enums";

export interface AnimalData {
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

export const listAvailableAnimals = async (): Promise<AnimalData[]> => {
  const availableAnimals = await fetcher(`${BackendRoutes.ANIMALS}/available`);
  return availableAnimals;
};
