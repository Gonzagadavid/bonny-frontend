"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const token = await sendRequest(BackendRoutes.LOGIN, {
    arg: { data: credentials, method: "POST" },
  });

  return token;
};
