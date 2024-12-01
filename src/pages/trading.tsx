'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInfiniteCards } from '../lib/useInfiniteCards';
import { Button } from '../components/ui/button';

type CardType = 'Live' | 'Bidding';

const Card = ({ type, number }: { type: CardType; number: number }) => {
  return (
    <div className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between p-4">
      <div className="flex justify-center">
        <Button
          variant="default"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          High
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{type}</h5>
        <span className="text-xl text-gray-500 dark:text-gray-400">Card #{number}</span>
      </div>
      <div className="flex justify-center">
        <Button
          variant="default"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          Low
        </Button>
      </div>
    </div>
  );
};

export default function InfiniteCardCarousel() {
  const { cards, currentIndex, next, prev } = useInfiniteCards();
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 5 minutes in seconds

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      next(); // Move to the next card
      setTimeLeft(30); // Reset the timer after moving
    }, 1 * 30 * 1000); // 5 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [next]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000); // Update countdown every second

    return () => clearInterval(countdown); // Cleanup on component unmount
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  // Convert timeLeft into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-full max-w-7xl overflow-hidden">
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10"
            onClick={prev}
            aria-label="Previous cards"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-4 items-center">
            {/* Timer Display */}
            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Next card in: {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="flex gap-8 items-center">
              {[-1, 0, 1, 2, 3].map((offset) => {
                const cardIndex = currentIndex + offset;
                const cardNumber = cards[cardIndex];
                if (cardNumber === undefined) return null;

                return (
                  <div
                    key={cardIndex}
                    className={`${
                      offset === 0 || offset === 1
                        ? 'scale-100 opacity-100'
                        : 'scale-90 opacity-50 blur-sm'
                    }`}
                  >
                    <Card
                      type={offset % 2 === 0 ? 'Live' : 'Bidding'}
                      number={cardNumber}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10"
            onClick={next}
            aria-label="Next cards"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
