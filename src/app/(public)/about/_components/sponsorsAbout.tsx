import { CardHeader, CardContent, CardTitle, Card } from "@/components/ui/card";
import { PawPattern } from "../../../../components/custom/background/pawPattern";
import { aboutData } from "@/data/about";
import Image from "next/image";

export default function SponsorsAbout() {
  return (
    <section
      className="relative flex items-center overflow-hidden py-24"
      style={{
        background: "radial-gradient(circle, #f4923a 0%, #c03619 100%)",
      }}
    >
      {/* Padrão de patinhas ao fundo */}
      <PawPattern />

      <div className="relative container mx-auto px-4">
        {/* Título responsivo */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Patrocinadores
        </h2>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {aboutData.sponsors?.map((sponsor, index) => (
            <Card key={index} className="w-full bg-white shadow-md rounded-xl">
              <CardHeader>
                <CardTitle className="text-amber-600 text-center text-lg">
                  {sponsor.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-gray-700">
                  {sponsor.description}
                </p>
                {sponsor.logo && (
                  <div className="mt-6 flex justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={`Logo de ${sponsor.name}`}
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
