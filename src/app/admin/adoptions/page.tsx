import React from "react";
import { listAdoptions } from "./_lib/listAdoptions";
import FilterBar from "./_components/filterBar";
import AdoptionsList from "./_components/adoptionList";

export default async function AdoptersPage() {
  const adoptions = await listAdoptions();

  console.log(adoptions);
  return (
    <div className="container mx-auto py-12 px-4">
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Gerenciar Adoções
        </h2>

        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <FilterBar />
          <AdoptionsList initialAdoptions={adoptions} />
        </div>
      </section>
    </div>
  );
}
