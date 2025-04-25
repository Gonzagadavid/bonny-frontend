'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export const GalleryCard = ({
  images,
  interval = 5000,
  className = '',
}: {
  images: GalleryImage[];
  interval?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md">
      {/* Imagem */}
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        fill
        className="object-cover"
        style={{ objectPosition: 'top 5%' }}
        priority
      />
      
      {/* Legenda */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-white text-center text-sm md:text-base">
          {images[currentIndex].caption}
        </p>
      </div>
      
      {/* Indicadores discretos (opcional) */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1 rounded-full transition-all ${
              currentIndex === index ? 'bg-white w-3' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};