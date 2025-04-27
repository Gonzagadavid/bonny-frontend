import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";
import { CandidacyStatus } from "@/types/enums";

export const createCandidacy = async (userId: string, dogId: string) => {
  await sendRequest(BackendRoutes.CANDIDACY, {
    arg: { data: { userId, dogId, status: CandidacyStatus.PENDING } },
  });
};
