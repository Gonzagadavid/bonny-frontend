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

export const listUsers = async (): Promise<UserData[]> => {
  const users = await fetcher(BackendRoutes.USERS);

  return users;
};
