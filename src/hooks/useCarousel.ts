import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (
  slideCount: number,
  autoPlay: boolean = true,
  interval: number = 5000
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning || slideCount <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, slideCount]);

  const goToPrev = useCallback(() => {
    if (isTransitioning || slideCount <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, slideCount]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex || slideCount <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, currentIndex, slideCount]);

  useEffect(() => {
    if (!autoPlay || isPaused || slideCount <= 1) return;
    
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, interval, isPaused, slideCount, autoPlay]);

  return {
    currentIndex,
    isTransitioning,
    isPaused,
    setIsPaused,
    goToNext,
    goToPrev,
    goToSlide
  };
};