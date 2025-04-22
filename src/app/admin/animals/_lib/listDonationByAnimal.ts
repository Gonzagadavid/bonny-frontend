import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface Donation {
  _id: string;
  name: string;
  birthDate: string;
  individualTaxpayerRegistry: string;
  email: string;
  cellPhone: string;
  donations: { value: number; createdAt: string }[];
}

export const listDonationByAnimal = async (id: string): Promise<Donation[]> => {
  const donations = await fetcher(`${BackendRoutes.DONATIONS}/by-dog/${id}`);

  return donations;
};
