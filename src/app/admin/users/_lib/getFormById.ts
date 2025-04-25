"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { Form } from "../../forms/_lib/listForms";

export const getFormById = async (id?: string): Promise<Form | null> => {
  if (!id) return null;
  const form = await fetcher(`${BackendRoutes.FORMS}/${id}`);

  return form;
};
