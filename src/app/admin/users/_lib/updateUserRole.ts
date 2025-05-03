import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export const updateUserRole = async (role: string, userId: string) => {
  await sendRequest(`${BackendRoutes.USERS}/${userId}`, {
    arg: { data: { role }, method: "PATCH" },
  });
};
