import { Form } from "@/app/admin/forms/_lib/listForms";
import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export const getActiveForm = async (): Promise<Form> => {
  const form = await fetcher(`${BackendRoutes.FORMS}/active-form`);
  return form;
};
