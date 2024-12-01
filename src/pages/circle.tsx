import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Clock, ChevronLeft, ChevronRight, ChevronsRight, History } from 'lucide-react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import clsx from 'clsx';
import io, { Socket } from 'socket.io-client';

const ROUND_TIME = 20;
const MIN_ROTATIONS = 5; // Minimum number of full rotations
const SPIN_DURATION = 5000; // 5 seconds spin

const LotteryWheel = () => {
  const { currentWallet, connectionStatus } = useCurrentWallet();

  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputAmount, setInputAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [roundId, setRoundId] = useState(183391);
  const [totalPool, setTotalPool] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [gamePhase, setGamePhase] = useState('bidding'); // bidding, spinning, ended

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('gameState', (state) => {
      setPlayers(state.players);
      setRoundId(state.roundId);
      setTotalPool(state.totalPool);
      setTimeLeft(state.timeLeft);
      setIsSpinning(state.isSpinning);
      setWinner(state.winner);
      
      if (state.rotation !== undefined) {
        handleWheelSpin(state.rotation);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Timer and game phase management
  useEffect(() => {
    if (gamePhase === 'bidding' && timeLeft > 0 && players.length > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && players.length > 0 && gamePhase === 'bidding') {
      setGamePhase('spinning');
      socket?.emit('selectWinner');
    }
  }, [timeLeft, players, gamePhase, socket]);

  // Handle wheel spinning animation
  interface Player {
    id: string;
    color: string;
    points: number;
    percentage: number;
  }

  interface GameState {
    players: Player[];
    roundId: number;
    totalPool: number;
    timeLeft: number;
    isSpinning: boolean;
    winner: Player | null;
    rotation?: number;
  }

  const handleWheelSpin = (targetRotation: number) => {
    setGamePhase('spinning');
    setIsSpinning(true);
    setRotation(targetRotation);

    // Reset game after spin animation
    setTimeout(() => {
      setGamePhase('ended');
      setIsSpinning(false);
    }, SPIN_DURATION);
  };

  // Reset game state
  const resetGame = () => {
    setGamePhase('bidding');
    setTimeLeft(ROUND_TIME);
    setWinner(null);
    setRotation(0);
    setPlayers([]);
    setTotalPool(0);
    setRoundId(prev => prev + 1);
  };

  interface BidData {
    amount: number;
    playerId: string;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (connectionStatus !== 'connected') {
      alert('Please connect your wallet to participate.');
      return;
    }

    if (gamePhase !== 'bidding') {
      alert('Bidding is currently closed.');
      return;
    }

    if (players.length >= 10) {
      alert('Maximum 10 players allowed per round');
      return;
    }

    const amount = parseFloat(inputAmount);
    if (!amount || isNaN(amount) || amount < 0.01) {
      alert('Please enter a valid amount (minimum 0.01 ETH).');
      return;
    }

    const bidData: BidData = { 
      amount, 
      playerId: currentWallet.accounts[0].address 
    };

    socket?.emit('placeBid', bidData);
    setInputAmount('');
  };

  interface SegmentPathProps {
    index: number;
    total: number;
    percentage: number;
  }

  const generateSegmentPath = ({ index, total, percentage }: SegmentPathProps): string => {
    const radius = 100;
    const anglePerPercentage = 360 / 100;
    const startAngle = players.slice(0, index).reduce((sum, p) => sum + p.percentage, 0) * anglePerPercentage;
    const endAngle = players.slice(0, index + 1).reduce((sum, p) => sum + p.percentage, 0) * anglePerPercentage;
    
    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = radius + radius * Math.cos(startRadians);
    const y1 = radius + radius * Math.sin(startRadians);
    const x2 = radius + radius * Math.cos(endRadians);
    const y2 = radius + radius * Math.sin(endRadians);
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  interface FormatTimeProps {
    seconds: number;
  }

  const formatTime = ({ seconds }: FormatTimeProps): string => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-20 p-6 w-full max-w-7xl mx-auto text-white grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Left Panel - Players List */}
      <div className="space-y-2 md:col-span-1">
        <h2 className="text-lg mb-4">{players.length} Players</h2>
        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {players.map((player) => (
            <div 
              key={player.id} 
              className={clsx(
                'flex items-center justify-between bg-gray-800 p-2 rounded transition-colors duration-300',
                winner?.id === player.id && 'bg-green-800'
              )}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: player.color }}
                />
                <div>
                  <div className="text-sm">{player.id.slice(0, 8)}...</div>
                  <div className="text-gray-400">{player.points.toFixed(2)} ETH</div>
                </div>
              </div>
              <div>{player.percentage.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel - Wheel */}
      <div className="md:col-span-2 flex flex-col items-center justify-between">
        <div className="flex justify-between w-full mb-4">
          <div className="text-2xl font-bold">Round #{roundId}</div>
          <div className="flex gap-2">
            <button 
              className="bg-gray-800 p-2 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={gamePhase !== 'ended'}
              onClick={resetGame}
            >
              <History size={20} />
            </button>
          </div>
        </div>

        <div className="relative w-96 h-96">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
            <div className="w-4 h-8 bg-red-500 rotate-180" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>

          {/* Wheel */}
          <div
            className="w-full h-full rounded-full border-8 border-gray-700"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? `transform ${SPIN_DURATION}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
              willChange: 'transform'
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {players.map((player, index) => (
                <path
                  key={player.id}
                  d={generateSegmentPath({ index, total: players.length, percentage: player.percentage })}
                  fill={player.color}
                  stroke="#333"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          {/* Center Status */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold mb-2">
              {winner ? (
                <img src="/api/placeholder/48/48" alt="ETH" className="w-12 h-12" />
              ) : (
                <Clock size={48} />
              )}
            </div>
            <div className="text-4xl font-bold">
              {gamePhase === 'ended' && winner 
                ? winner.points.toFixed(2)
                : timeLeft > 0 
                  ? formatTime({ seconds: timeLeft }) 
                  : '...'}
            </div>
            <div className="text-xl text-gray-400">
              {gamePhase === 'ended' 
                ? 'Winner!' 
                : gamePhase === 'spinning' 
                  ? 'Spinning...'
                  : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Stats & Controls */}
      <div className="space-y-4 md:col-span-1">
        <div className="bg-gray-800 p-4 rounded">
          <div className="text-gray-400">Prize Pool</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <img src="/api/placeholder/24/24" alt="ETH" className="w-6 h-6" />
            {totalPool.toFixed(2)}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <div className="text-gray-400">Your Entries</div>
          <div className="text-2xl font-bold">
            {connectionStatus === 'connected' && currentWallet?.accounts[0].address 
              ? players.filter(p => p.id === currentWallet.accounts[0].address).length 
              : 0}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded">
          <div className="text-gray-400">Your Win Chance</div>
          <div className="text-2xl font-bold">
            {connectionStatus === 'connected' && currentWallet?.accounts[0].address && totalPool > 0
              ? ((players
                  .filter(p => p.id === currentWallet.accounts[0].address)
                  .reduce((sum, p) => sum + p.points, 0) / totalPool) * 100
                ).toFixed(1) + '%'
              : '0%'}
          </div>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="ETH Amount"
              className="bg-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              min="0.01"
              step="0.01"
              disabled={gamePhase !== 'bidding' || connectionStatus !== 'connected'}
            />
            <button
              type="submit"
              className={clsx(
                'bg-blue-600 px-6 py-2 rounded transition-colors duration-300',
                (gamePhase !== 'bidding' || connectionStatus !== 'connected')
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-700'
              )}
              disabled={gamePhase !== 'bidding' || connectionStatus !== 'connected'}
            >
              {gamePhase === 'bidding' ? 'Place Bid' : 'Game in Progress'}
            </button>
          </form>
          {connectionStatus !== 'connected' && (
            <div className="mt-2 text-red-500 text-sm">
              Please connect your wallet to place a bid.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LotteryWheel;