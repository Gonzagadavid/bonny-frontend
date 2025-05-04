"use client";

import { DonationModal } from "@/components/custom/donationModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SponsorshipButton = ({ animalName }: { animalName: string }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <DonationModal
      isDonationModalOpen={isDonationModalOpen}
      setIsDonationModalOpen={setIsDonationModalOpen}
    >
      <Button className="w-full rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white transition-all duration-300 ease-in-out transform bg-[#f4923a] hover:bg-[#dc7011] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff903c]">
        Quero apadrinhar {animalName}
      </Button>
    </DonationModal>
  );
};
