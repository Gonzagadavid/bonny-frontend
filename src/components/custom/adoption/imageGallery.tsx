'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const openModal = (src: string) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-48 rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => openModal(img)}
          >
            <Image src={img} alt={`Imagem do ${name}`} fill className="object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          id="image-modal"
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={modalImageSrc}
            alt="Imagem ampliada"
            className="max-w-3xl max-h-[90vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
