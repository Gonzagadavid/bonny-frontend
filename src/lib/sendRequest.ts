"use server";

import { auth } from "@/app/api/auth/auth";

const baseUrlApi = process.env.BASE_URI_API;

export async function sendRequest(
  route: string,
  { arg }: { arg: RequestInit & { data: unknown } },
) {
  const session = await auth();
  const authorization = `Bearer ${session?.token?.accessToken}`;
  const { method = "POST", data } = arg;
  const res = await fetch(`${baseUrlApi}${route}`, {
    method,
    cache: "no-store",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization,
    } as Record<string, string>,
  });
  const response = await res.json().catch(() => null);
  if (!res.ok) return Promise.reject(response);
  return response;
}
