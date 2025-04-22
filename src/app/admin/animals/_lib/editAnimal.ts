"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";
import { Animal } from "./listAnimals";

export async function editAnimal(
  id: string,
  data: Partial<Animal>,
): Promise<void> {
  await sendRequest(`${BackendRoutes.ANIMALS}/${id}`, {
    arg: { data, method: "PATCH" },
  });
}
