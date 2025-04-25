'use client'

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  interval?: number;
  autoPlay?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
}

export const HeroCarouselAbout = ({
  slides,
  interval = 5000,
  autoPlay = true,
  showControls = true,
  showIndicators = true,
}: HeroCarouselProps) => {
  const {
    currentIndex,
    isTransitioning,
    isPaused,
    setIsPaused,
    goToNext,
    goToPrev,
    goToSlide
  } = useCarousel(slides.length, autoPlay, interval);

  if (!slides.length) return null;

  return (
    <div 
      className="relative w-full h-[60vh] min-h-[400px] max-h-[800px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-[90vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"vazios
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          </div>
        ))}
      </div>

      {/* Conteúdo do Slide Atual */}
      <div className={`absolute inset-0 flex items-center justify-center text-center px-4 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="max-w-4xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {slides[currentIndex].title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            {slides[currentIndex].subtitle}
          </p>
        </div>
      </div>

      {/* Controles de Navegação */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all transform -translate-y-1/2"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-10 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all transform -translate-y-1/2"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
