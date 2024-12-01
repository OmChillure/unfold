'use client'

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import { Clock, ChevronLeft, ChevronRight, ChevronsRight, History } from 'lucide-react';
import { Player } from '../types/react-types';
import clsx from 'clsx';
import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';

const ROUND_TIME: number = 20;

const LotteryWheel: React.FC = () => {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputAmount, setInputAmount] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(ROUND_TIME);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [roundId, setRoundId] = useState<number>(183391);
  const [totalPool, setTotalPool] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('gameState', (state: any) => {
      setPlayers(state.players);
      setRoundId(state.roundId);
      setTotalPool(state.totalPool);
      setTimeLeft(state.timeLeft);
      setIsSpinning(state.isSpinning);
      setWinner(state.winner);
      setRotation(state.rotation || 0);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && players.length > 0 && !isSpinning) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && players.length > 0 && !isSpinning) {
      socket?.emit('selectWinner');
    }
  }, [timeLeft, players, isSpinning, socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (connectionStatus !== 'connected') {
      alert('Please connect your wallet to participate.');
      return;
    }

    if (players.length >= 10) {
      alert('Maximum 10 players allowed per round');
      return;
    }

    const amount = parseFloat(inputAmount);
    if (!currentWallet?.accounts[0].address || !amount || isNaN(amount)) {
      alert('Invalid wallet address or amount.');
      return;
    }

    socket?.emit('placeBid', { amount, playerId: currentWallet.accounts[0].address });
    setInputAmount('');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputAmount(e.target.value);
  };

  const generateSegmentPath = (index: number, total: number, percentage: number, radius: number = 100) => {
    const anglePerPercentage = 360 / 100;
    const startAngle = (players.slice(0, index).reduce((sum, p) => sum + p.percentage, 0)) * anglePerPercentage;
    const endAngle = (players.slice(0, index + 1).reduce((sum, p) => sum + p.percentage, 0)) * anglePerPercentage;

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = radius + radius * Math.cos(startRadians);
    const y1 = radius + radius * Math.sin(startRadians);
    const x2 = radius + radius * Math.cos(endRadians);
    const y2 = radius + radius * Math.sin(endRadians);

    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  return (
    <div className="mt-20 p-6 w-full max-w-7xl mx-auto text-white grid grid-cols-1 md:grid-cols-4 gap-8">

      {/* Left Panel */}
      <div className="space-y-2 md:col-span-1">
        <h2 className="text-lg mb-4">{players.length} Players</h2>
        <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {players.map((player) => (
            <div key={player.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: player.color }}
                />
                <div>
                  <div>{player.id}</div>
                  <div className="text-gray-400">{player.points} Pts</div>
                </div>
              </div>
              <div>{player.percentage.toFixed(2)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel */}
      <div className="md:col-span-2 flex flex-col items-center justify-between">
        <div className="flex justify-between w-full mb-4">
          <div className="text-2xl font-bold">Round #{roundId}</div>
          <div className="flex gap-2">
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700"><History size={20} /></button>
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700"><ChevronLeft size={20} /></button>
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700"><ChevronRight size={20} /></button>
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700"><ChevronsRight size={20} /></button>
          </div>
        </div>
        <div className="relative w-96 h-96">
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8H9L12 2Z" fill="red" />
            </svg>
          </div>
          {/* Wheel */}
          <div
            className="w-full h-full rounded-full border-8 border-gray-700 transition-transform duration-[5000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {players.map((player, index) => (
                <path
                  key={player.id}
                  d={generateSegmentPath(index, players.length, player.percentage)}
                  fill={player.color}
                  stroke="#333"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold mb-2">
              {winner ? (
                <img src="/placeholder.svg?height=48&width=48" alt="Ethereum" className="w-12 h-12" />
              ) : (
                <Clock size={48} />
              )}
            </div>
            <div className="text-4xl font-bold">
              {winner ? winner.id : timeLeft > 0 ? formatTime(timeLeft) : '0.03'}
            </div>
            <div className="text-xl text-gray-400">
              {winner ? 'Winner!' : timeLeft > 0 ? '' : 'Drawing Winner...'}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="space-y-4 md:col-span-1">
        <div className="bg-gray-800 p-4 rounded">
          <div className="text-gray-400">Prize Pool</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <img src="/placeholder.svg?height=24&width=24" alt="Ethereum" className="w-6 h-6" />
            {totalPool.toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded">
          <div className="text-gray-400">Players</div>
          <div className="text-2xl font-bold">{players.length}/500</div>
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
            {connectionStatus === 'connected' && currentWallet?.accounts[0].address && players.length > 0 
              ? (
                  (
                    (players.filter(p => p.id === currentWallet.accounts[0].address)
                      .reduce((sum, p) => sum + p.points, 0) / totalPool) * 100
                  ).toFixed(2)
                ) + '%'
              : '0%'}
          </div>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Removed ID Input */}
            {/* 
            <input
              type="text"
              value={inputId}
              onChange={handleIdChange}
              placeholder="Enter ID"
              className="bg-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              disabled={isSpinning}
            />
            */}
            <input
              type="number"
              value={inputAmount}
              onChange={handleAmountChange}
              placeholder="ETH Amount"
              className="bg-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              min="0.01"
              step="0.01"
              disabled={isSpinning || connectionStatus !== 'connected'}
            />
            <button
              type="submit"
              className={clsx(
                'bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300',
                isSpinning || connectionStatus !== 'connected' ? 'opacity-50 cursor-not-allowed' : ''
              )}
              disabled={isSpinning || connectionStatus !== 'connected'}
            >
              {isSpinning ? 'Spinning...' : 'Bid'}
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

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  walletInfo: {
    marginTop: '20px',
  },
  accountButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '0',
    fontSize: '1em',
  },
  selectedAccount: {
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
  },
};

export default LotteryWheel;
