import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";
import { CandidacyStatus } from "@/types/enums";

interface Dog {
  _id: string;
  name: string;
  age: number;
  size: string;
  breed: string;
  fellColor: string;
  fell: string;
  temperament: string;
  situation: string;
  history: string;
  imageProfile: string;
  images: string[];
  available: boolean;
  gender: string;
}

export interface Candidacy {
  _id: string;
  user: string;
  dog: Dog;
  status: CandidacyStatus;
  createdAt: string;
}

export const getCandidaciesByUser = async (
  id?: string,
): Promise<Candidacy[]> => {
  if (!id) return [];
  const candidacies = await fetcher(`${BackendRoutes.CANDIDACY}/by-user/${id}`);

  return candidacies;
};
