"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

interface CreateUserData {
  name: string;
  email: string;
  birthDate: string;
  cellPhone: string;
  password: string;
  individualTaxpayerRegistry: string;
  role: string;
}

export async function createUser(userData: CreateUserData): Promise<void> {
  await sendRequest(BackendRoutes.USERS, {arg: {data: userData}})
}
