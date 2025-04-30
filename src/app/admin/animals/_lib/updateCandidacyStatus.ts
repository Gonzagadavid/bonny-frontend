"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";
import { CandidacyStatus } from "@/types/enums";

export interface UpdateCandidacyStatusDto {
  candidacyId: string;
  status: CandidacyStatus;
}

export async function updateCandidacyStatusRequest(
  updateCandidacyStatusDto: UpdateCandidacyStatusDto,
): Promise<void> {
  await sendRequest(`${BackendRoutes.CANDIDACY}/update-status`, {
    arg: { data: updateCandidacyStatusDto, method: "PATCH" },
  });
}
