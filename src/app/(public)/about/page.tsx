import { aboutData } from "@/data/about";
import { HeroCarouselAbout } from "@/app/(public)/about/_components/heroCarouselAbout";
import HistoryAbout from "@/app/(public)/about/_components/historyAbout";
import TeamAbout from "@/app/(public)/about/_components/teamAbout";
import SponsorsAbout from "@/app/(public)/about/_components/sponsorsAbout";
import CtaEndAbout from "@/app/(public)/about/_components/ctaEndAbout";
import InstagramFloatingButton from "@/components/custom/instagramFloatingButton";
// import { GalleryCard } from "@/app/(public)/about/_components/galleryCard";
// import { aboutVolunteersImages } from "@/data/galleryImages";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section com Carrossel */}
      <HeroCarouselAbout
        slides={aboutData.heroSlides}
        interval={6000}
        autoPlay={true}
        showControls={true}
        showIndicators={true}
      />

      <InstagramFloatingButton />
      <HistoryAbout />

      {/* <section className="relative py-20 flex items-center overflow-hidden bg-[#faebd8] w-full">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-4xl h-[630px] rounded-xl overflow-hidden shadow-xl">
              <GalleryCard
                images={[...aboutVolunteersImages]}
                interval={6000}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      <SponsorsAbout />
      <TeamAbout />
      <CtaEndAbout />

      <footer className="bg-[#c03619] text-white text-center py-5">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Projeto Bonny. Todos os direitos
            reservados.
          </p>
          <p className="text-xs mt-1">
            Feito com ❤️ para promover a adoção responsável.
          </p>
        </div>
      </footer>
    </div>
  );
}
