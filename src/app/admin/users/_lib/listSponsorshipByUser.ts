"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface Dog {
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
}

export interface Sponsorship {
  _id: string;
  dog: Dog;
}
export const listSponsorshipByUser = async (
  id: string,
): Promise<Sponsorship[]> => {
  const sponsorships = await fetcher(
    `${BackendRoutes.SPONSORSHIP}/dogs-by-user/${id}`,
  );

  return sponsorships;
};
