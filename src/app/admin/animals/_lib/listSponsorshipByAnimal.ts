import { BackendRoutes } from "@/constants/backend-routes";
import { fetcher } from "@/lib/fetcher";

export interface Sponsorship {
  _id: string;
  user: {
    _id: string;
    name: string;
    birthDate: string;
    individualTaxpayerRegistry: string;
    email: string;
    cellPhone: string;
  };
}

export const listSponsorshipByAnimal = async (id: string) => {
  const sponsorships = await fetcher(
    `${BackendRoutes.SPONSORSHIP}/users-by-dog/${id}`,
  );

  return sponsorships;
};
