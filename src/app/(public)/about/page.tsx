import { aboutData } from "@/data/about";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/custom/Header";

export default function HomePage() {
  return (
    <>
    <Header />
    <div className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${aboutData.hero.backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {aboutData.hero.title}
          </h1>
          <p className="mt-4 text-xl text-white/90">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* História */}
      <section className="container mx-auto py-16 px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-amber-600">
          {aboutData.history.title}
        </h2>
        <div className="space-y-6 text-lg">
          {aboutData.history.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {/* Timeline */}
        <div className="mt-12 border-l-4 border-amber-500 pl-8 space-y-12">
          {aboutData.history.timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-11 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                {item.year}
              </div>
              <p className="font-semibold">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Patrocinadores */}
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-amber-600">
      Patrocinadores
    </h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {aboutData.sponsors?.map((sponsor, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-amber-600">
              {sponsor.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{sponsor.description}</p>
            {sponsor.logo && (
              <div className="mt-4">
                <Image
                  src={sponsor.logo}
                  alt={`Logo de ${sponsor.name}`}
                  width={120}
                  height={60}
                  className="mx-auto"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Equipe */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-amber-600">
          {aboutData.team.title}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {aboutData.team.members.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full w-40 h-40 object-cover mx-auto mb-4"
              />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            {aboutData.cta.title}
          </h2>
          <Button asChild variant="secondary">
            <Link href={aboutData.cta.link}>
              {aboutData.cta.buttonText}
            </Link>
          </Button>
        </div>
      </section>
    </div>
    </>
  );
}