import Image from "next/image";
import ImageGallery from "@/app/(public)/adoption/_components/imageGalleryAdoption";
import { getAnimal } from "../_lib/getAnimal";
import { AdoptionButton } from "../_components/adoptionButton";
import {
  dogFellLabel,
  dogSizeLabel,
  genderLabel,
} from "../../../../constants/labels";
import { SponsorshipButton } from "../_components/sponsorshipButton";

export default async function AnimalsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const animal = await getAnimal(id);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4e4d0" }}>
      <section className="bg-[#f4923a] sm:bg-amber-600 py-6  shadow-md mt-0 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow">
          Conheça {animal.name} 🐶
        </h1>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 transition-all duration-500 ease-in-out transform hover:scale-105">
              <Image
                src={animal.imageProfile}
                alt={animal.name}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>

            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {animal.name}
                  </h2>
                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: "#dc7011" }}
                  >
                    {animal.situation}
                  </p>
                </div>

                {animal.available && (
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold text-white transition-all duration-300 ease-in-out transform bg-green-600 hover:bg-green-700 shadow-md hover:scale-105">
                    Disponível
                  </span>
                )}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Idade</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {animal.age} anos
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Porte</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {dogSizeLabel?.[animal.size] ?? ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Raça</p>
                  <p className="mt-1 text-sm text-gray-900">{animal.breed}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Cor do Pelo
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {animal.fellColor}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tipo de Pelo
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {dogFellLabel?.[animal.fell] ?? ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Temperamento
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {animal.temperament}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Sexo</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {genderLabel?.[animal.gender] ?? ""}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">História</h3>
                <p className="mt-2 text-sm text-gray-600">{animal.history}</p>
                <p className="mt-4 text-sm text-gray-700 bg-orange-100 p-4 rounded-md border-l-4 border-orange-500">
                  <strong>Aviso:</strong> As adoções são realizadas{" "}
                  <strong>
                    mediante entrevista e assinatura de termo de
                    responsabilidade
                  </strong>
                  . Além disso, parte das despesas com os cuidados veterinários
                  pode ser repassada aos adotantes, garantindo a continuidade do
                  acolhimento de novos animais.
                </p>
              </div>

              <div className="mt-8">
                <div className="flex space-x-4">
                  <AdoptionButton
                    animalId={animal._id}
                    animalName={animal.name}
                  />
                  <SponsorshipButton animalName={animal.name} />
                </div>
              </div>
            </div>
          </div>
          {animal.images.length > 1 && (
            <div className="border-t border-gray-200 px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Mais fotos de {animal.name}
              </h3>
              <ImageGallery images={animal.images} name={animal.name} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
