"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";

enum AnswerType {
  ALTERNATIVE = "ALTERNATIVE",
  MULTIPLE = "MULTIPLE",
  TEXT = "TEXT",
}

export type Alternative = {
  id: string;
  alternativeText: string;
};

export interface Question {
  id: string;
  question: string;
  answerType: AnswerType;
  alternatives: Alternative[];
}

export interface CreateFormData {
  title: string;
  questions: Question[];
}

export async function createForm(
  createFormData: CreateFormData,
): Promise<void> {
  await sendRequest(BackendRoutes.FORMS, { arg: { data: createFormData } });
}
