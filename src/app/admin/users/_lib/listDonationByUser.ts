"use server";

import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface Donation {
  value: number;
  createdAt: string;
}

export interface Donations {
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
  donations: Donation[];
}

export const listDonationByUser = async (id: string): Promise<Donations[]> => {
  const donations = await fetcher(`${BackendRoutes.DONATIONS}/by-user/${id}`);

  return donations;
};
