import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { AnimalData } from "./listAvailableAnimals";

export const getAnimal = async (id: string): Promise<AnimalData> => {
  const animal = await fetcher(`${BackendRoutes.ANIMALS}/${id}`);

  return animal;
};
