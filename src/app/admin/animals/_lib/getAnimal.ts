import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { Animal } from "./listAnimals";

export const getAnimal = async (id: string): Promise<Animal> => {
  const animal = await fetcher(`${BackendRoutes.ANIMALS}/${id}`);

  return animal;
};
