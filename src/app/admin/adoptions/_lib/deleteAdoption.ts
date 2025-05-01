"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export async function deleteAdoption(id: string): Promise<void> {
  await sendRequest(`${BackendRoutes.ADOPTIONS}/${id}`, {
    arg: { data: {}, method: "DELETE" },
  });
}
