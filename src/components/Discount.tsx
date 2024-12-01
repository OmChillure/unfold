import React from "react"

export default function RaffleBanner() {
    return (
      <div className="relative w-[70%] h-[200px] overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500">
        <div className="absolute inset-0 flex items-center justify-between p-8">
          {/* Left content */}
          <div className="space-y-4 max-w-[50%]">
            <h2 className="text-3xl font-bold text-white">
              Take part in raffles
            </h2>
            <p className="text-sm text-white/90">
              There are three general categories of casino games: gaming machines, table games...
            </p>
            <button className="px-6 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-black/80 transition-colors">
              Purchase tickets
            </button>
          </div>
  
          {/* Center content */}
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <span className="text-7xl font-bold text-white opacity-90">
              50%
            </span>
          </div>
  
          {/* Right content - Gift Box */}
          <div className="relative w-32 h-32 ml-auto">
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Gift box image */}
                <img 
                  src="/placeholder.svg?height=128&width=128" 
                  alt="Gift box"
                  className="w-32 h-32 object-contain"
                />
                {/* Confetti elements */}
                <div className="absolute -top-4 -right-4">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" />
                </div>
                <div className="absolute -top-2 right-8">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:200ms]" />
                </div>
                <div className="absolute top-0 right-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:400ms]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  