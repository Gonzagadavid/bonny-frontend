"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export const updateLastCheck = async (id: string) => {
  await sendRequest(`${BackendRoutes.ADOPTIONS}/${id}`, {
    arg: { data: { lastCheck: new Date() }, method: "PATCH" },
  });
};
