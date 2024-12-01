'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInfiniteCards } from '../lib/useInfiniteCards';
import { Button } from '../components/ui/button';
import axios from 'axios';

type CardType = 'Live' | 'Bidding';

interface CardProps {
  type: CardType;
  number: number;
  price: number | null;
  referencePrice: number | null;
}

interface PriceData {
  price: {
    price: string;
    expo: number;
  };
}

interface SUIResponse {
  parsed: PriceData[];
}

const Card = ({ type, number, price, referencePrice }: CardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isLive = type === 'Live';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHighClick = () => {
    console.log('High clicked for card:', number);
  };

  const handleLowClick = () => {
    console.log('Low clicked for card:', number);
  };

  return (
    <div className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between p-4">
      <div className="flex justify-center">
        <Button
          variant="default"
          className={`w-full ${
            isLive 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
          onClick={handleHighClick}
          disabled={isLive}
        >
          High
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className={`px-4 py-1 rounded-full ${
          isLive ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {type}
        </div>
        <span className="text-xl text-gray-500 dark:text-gray-400">Card #{number}</span>
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {price ? `$${price.toLocaleString()}` : 'Loading...'}
          </div>
          {isLive && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Reference: ${referencePrice?.toLocaleString() || 'Loading...'}
            </div>
          )}
          <div className="text-lg text-gray-600 dark:text-gray-300">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant="default"
          className={`w-full ${
            isLive 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } text-white`}
          onClick={handleLowClick}
          disabled={isLive}
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [suiPrice, setSUIPrice] = useState<number | null>(null);
  const [referencePrices, setReferencePrices] = useState<{ [key: number]: number }>({});
  const [transitioningCards, setTransitioningCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await axios.get('https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744');
        const data = (response.data as SUIResponse).parsed;
        if (data && data[0]) {
          const price = parseInt(data[0].price.price) * Math.pow(10, data[0].price.expo);
          setSUIPrice(price);
          
          // Check for transitioning cards and store their reference prices
          transitioningCards.forEach(cardNumber => {
            setReferencePrices(prev => ({
              ...prev,
              [cardNumber]: price
            }));
            setTransitioningCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(cardNumber);
              return newSet;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching SUI price:', error);
      }
    };

    fetchBTCPrice();
    const priceInterval = setInterval(fetchBTCPrice, 1000);

    return () => clearInterval(priceInterval);
  }, [transitioningCards]);

  useEffect(() => {
    const nextCardNumber = cards[currentIndex + 1];
    if (nextCardNumber && !referencePrices[nextCardNumber]) {
      setTransitioningCards(prev => new Set([...prev, nextCardNumber]));
    }
  }, [currentIndex, cards]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
      setTimeLeft(30);
    }, 1 * 30 * 1000);

    return () => clearInterval(interval);
  }, [next]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  if (!isMounted) {
    return null;
  }

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
            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Next card in: {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="flex gap-8 items-center">
              {[-1, 0, 1, 2, 3].map((offset) => {
                const cardIndex = currentIndex + offset;
                const cardNumber = cards[cardIndex];
                if (cardNumber === undefined) return null;

                const cardType: CardType = offset <= 0 ? 'Live' : 'Bidding';

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
                      type={cardType}
                      number={cardNumber}
                      price={suiPrice}
                      referencePrice={referencePrices[cardNumber]}
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