"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { Question } from "./createForm";

export interface Form {
  _id: string;
  title: string;
  questions: Question[];
  active: boolean;
  createdAt: string;
}

export const listForm = async (): Promise<Form[]> => {
  const forms = await fetcher(BackendRoutes.FORMS);

  return forms;
};
