'use client'

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInfiniteCards } from '../lib/useInfiniteCards';
import { Button } from '../components/ui/button';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';

type CardType = 'Live' | 'Bidding';

interface CardProps {
  type: CardType;
  number: number;
  price: number | null;
  referencePrice: number | null;
  onBid: (direction: 'high' | 'low') => void;
  result?: {
    winner?: boolean;
    amount?: number;
  };
}

// Initialize socket outside component to prevent multiple connections
const socket = io('http://localhost:3001');

const Card = ({ type, number, price, referencePrice, onBid, result }: CardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isLive = type === 'Live';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHighClick = () => {
    if (!isLive) onBid('high');
  };

  const handleLowClick = () => {
    if (!isLive) onBid('low');
  };

  return (
    <div className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between p-4">
      {result && (
        <div className={`text-center mb-2 p-2 rounded ${
          result.winner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {result.winner ? `Won $${result.amount?.toFixed(2)}!` : 'Lost'}
        </div>
      )}

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
            {price ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 4 })}` : 'Loading...'}
          </div>
          {isLive && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Reference: ${referencePrice?.toLocaleString(undefined, { minimumFractionDigits: 4 }) || 'Loading...'}
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
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [referencePrices, setReferencePrices] = useState<{ [key: number]: number }>({});
  const [results, setResults] = useState<{ [key: number]: { winner: boolean; amount: number } }>({});

  useEffect(() => {
    setIsMounted(true);

    socket.on('gameState', (state) => {
      setCurrentPrice(state.currentRound.currentPrice);
      setTimeLeft(state.currentRound.timeLeft);
      const currentCard = cards[currentIndex];
      if (currentCard) {
        setReferencePrices(prev => ({
          ...prev,
          [currentCard]: state.currentRound.currentPrice
        }));
      }
    });

    socket.on('roundResult', (result) => {
      const { roundId, won, amount } = result;
      setResults(prev => ({
        ...prev,
        [roundId]: { winner: won, amount }
      }));
      if (won) {
        toast.success(`Won $${amount.toFixed(2)}!`);
      } else {
        toast.error('Better luck next time!');
      }
      // Auto advance to next card after result
      setTimeout(next, 2000);
    });

    socket.on('timeUpdate', ({ timeLeft }) => {
      setTimeLeft(timeLeft);
    });

    return () => {
      socket.off('gameState');
      socket.off('roundResult');
      socket.off('timeUpdate');
    };
  }, [currentIndex, cards, next]);

  const handleBid = (cardNumber: number, direction: 'high' | 'low') => {
    socket.emit('placeBid', {
      roundId: cardNumber,
      prediction: direction,
      amount: 0.01 // Default bid amount
    });
    toast.success(`Placed ${direction} bid`);
  };

  if (!isMounted) return null;

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
                      price={currentPrice}
                      referencePrice={referencePrices[cardNumber]}
                      onBid={(direction) => handleBid(cardNumber, direction)}
                      result={results[cardNumber]}
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