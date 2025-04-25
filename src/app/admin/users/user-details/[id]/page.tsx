import { DonationList } from "../../_components/donationList";
import { FormAnswerByUser } from "../../_components/formAnswerByUser";
import { SponsorshipList } from "../../_components/sponsorshipList";
import { UserInfo } from "../../_components/userInfo";
import { getFormAnswerByUser } from "../../_lib/getFormAnswerByUser";
import { getFormById } from "../../_lib/getFormById";
import { getUser } from "../../_lib/getUser";
import { listDonationByUser } from "../../_lib/listDonationByUser";
import { listSponsorshipByUser } from "../../_lib/listSponsorshipByUser";

export default async function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userInfo = await getUser(id);
  const sponsorships = await listSponsorshipByUser(id);
  const donations = await listDonationByUser(id);
  const formAnswers = await getFormAnswerByUser(id);
  const form = await getFormById(formAnswers?.formVersionId);

  return (
    <div className="container mx-auto py-12 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Detalhes do usuário
        </h2>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <UserInfo user={userInfo} />
          <SponsorshipList sponsorships={sponsorships} />
          <DonationList donations={donations} />
          <FormAnswerByUser form={form} formAnswers={formAnswers} />
        </div>
      </section>
    </div>
  );
}
