import { useState, useCallback } from 'react';

export function useInfiniteCards(initialCount: number = 10) {
  const [cards, setCards] = useState(Array.from({ length: initialCount }, (_, i) => i + 1));
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === cards.length - 2) {
        setCards((prevCards) => [...prevCards, prevCards.length + 1]);
      }
      return prevIndex + 1;
    });
  }, [cards.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }, []);

  return { cards, currentIndex, next, prev };
}

