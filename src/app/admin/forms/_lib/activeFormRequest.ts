"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export async function activeFormRequest(id: string): Promise<void> {
  await sendRequest(`${BackendRoutes.FORMS}/active-form/${id}`, {
    arg: { data: {} },
  });
}
