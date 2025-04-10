"use server";

import { auth } from "@/app/api/auth/auth";
import { BackendRoutes } from "@/constants/backend-routes";

const baseUrlApi = process.env.BASE_URI_API;

export async function fetcher(route: BackendRoutes) {
  const session = await auth();
  const authorization = `Bearer  ${session?.token?.accessToken}`;
  const res = await fetch(`${baseUrlApi}${route}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });
  const response = await res.json().catch(() => null);
  if (!res.ok) return Promise.reject(response);
  return response;
}
