import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { CandidacyStatus } from "@/types/enums";

export interface CandidacyUser {
  _id: string;
  name: string;
  birthDate: string;
  individualTaxpayerRegistry: string;
  email: string;
  cellPhone: string;
  role: string;
}

export interface Candidacy {
  _id: string;
  user: CandidacyUser;
  dog: string;
  status: CandidacyStatus;
}

export const getCandidacies = async (id: string): Promise<Candidacy[]> => {
  const candidacies = await fetcher(`${BackendRoutes.CANDIDACY}/by-dog/${id}`);

  return candidacies;
};
