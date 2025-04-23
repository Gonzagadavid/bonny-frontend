import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { Form } from "./listForms";

export const getFormById = async (id: string): Promise<Form> => {
  const form = await fetcher(`${BackendRoutes.FORMS}/${id}`);

  return form;
};
