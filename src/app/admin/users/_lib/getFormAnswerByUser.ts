"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface FormAnswer {
  _id: string;
  formVersionId: string;
  title: string;
  answers: string;
  userId: string;
  createdAt: string;
}

export const getFormAnswerByUser = async (
  id: string,
): Promise<FormAnswer | null> => {
  const answer = await fetcher(`${BackendRoutes.FORM_ANSWERS}/by-user/${id}`);

  if (!answer) {
    return null;
  }
  return answer;
};
