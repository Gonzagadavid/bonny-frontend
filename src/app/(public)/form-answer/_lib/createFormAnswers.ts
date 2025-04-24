"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

export interface CreateFormAnswerDto {
  formVersionId: string;
  title: string;
  answers: Record<string, string | string[]>;
}

export async function createFormAnswer(
  createFormAnswerData: CreateFormAnswerDto,
): Promise<void> {
  await sendRequest(BackendRoutes.FORM_ANSWERS, {
    arg: { data: createFormAnswerData },
  });
}
