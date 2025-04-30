import AnimalInfo from "../../_components/animalInfo";
import Candidacies from "../../_components/candidacies";
import DonationList from "../../_components/donationList";
import SponsorshipList from "../../_components/sponsordhipList";
import { getAnimal } from "../../_lib/getAnimal";
import { getCandidacies } from "../../_lib/getCandidacies";
import { listDonationByAnimal } from "../../_lib/listDonationByAnimal";
import { listSponsorshipByAnimal } from "../../_lib/listSponsorshipByAnimal";

export default async function AnimalDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animalInfo = await getAnimal(id);
  const candidacies = await getCandidacies(id);
  const sponsorships = await listSponsorshipByAnimal(id);
  const donations = await listDonationByAnimal(id);

  return (
    <div className="container mx-auto py-12 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Detalhes do Animal
        </h2>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <AnimalInfo animal={animalInfo} />
          <SponsorshipList sponsorships={sponsorships} />
          <DonationList donations={donations} />
          <Candidacies candidacies={candidacies} />
        </div>
      </section>
    </div>
  );
}
