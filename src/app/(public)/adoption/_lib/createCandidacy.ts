import { BackendRoutes } from "@/constants/backend-routes";
import { sendRequest } from "@/lib/sendRequest";
import { CandidacyStatus } from "@/types/enums";

export const createCandidacy = async (user: string, dog: string) => {
  await sendRequest(BackendRoutes.CANDIDACY, {
    arg: { data: { user, dog, status: CandidacyStatus.PENDING } },
  });
};
