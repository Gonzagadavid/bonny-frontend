"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  birthDate: string;
  cellPhone: string;
  individualTaxpayerRegistry: string;
  role: string;
}

export const getUser = async (id: string): Promise<UserData> => {
  const users = await fetcher(`${BackendRoutes.USERS}/${id}`);

  return users;
};
