import { aboutData } from "@/data/about";
import { HeroCarouselAbout } from "@/components/custom/about/heroCarouselAbout";
import HistoryAbout from "@/components/custom/about/historyAbout";
import TeamAbout from "@/components/custom/about/teamAbout";
import SponsorsAbout from "@/components/custom/about/sponsorsAbout";
import CtaEndAbout from "@/components/custom/about/ctaEndAbout";
import InstagramFloatingButton from "@/components/custom/instagramFloatingButton";
import { GalleryCard } from "@/components/custom/about/galleryCard";
import { aboutVolunteersImages } from "@/data/galleryImages";

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

      <section className="relative py-20 flex items-center overflow-hidden bg-[#faebd8] w-full">
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
      </section>

      <SponsorsAbout />
      <TeamAbout />
      <CtaEndAbout />
    </div>
  );
}
