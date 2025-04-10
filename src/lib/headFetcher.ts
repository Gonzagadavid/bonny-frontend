"use server";

import { BackendRoutes } from "@/constants/backend-routes";

const baseUrlApi = process.env.BASE_URI_API;

export const headFetcher = async (route: BackendRoutes, statusOk = 200) => {
  const response = await fetch(`${baseUrlApi}${route}`, {
    method: "HEAD",
    cache: "no-store",
  });
  if (response.status === statusOk) return true;
  return false;
};
