import React from "react"
// import { StarsBackground } from "@/components/ui/shooting-stars"
// import Gradientbutton from "./ui/gradient-button"
// import { anta } from "./ui/fonts"
// import Link from "next/link"

export default function Hero() {
    return (
      <div className="relative min-h-screen bg-[#071425] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
        //   style={{
        //     backgroundImage: `
        //       linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
        //       linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        //     `,
        //     backgroundSize: '235px 170px',
        //   }}
        />
        <div className="absolute top-0 right-[-4] w-64 h-64 bg-white rounded-full filter blur-[60px] opacity-10 z-0" />
        <div className="absolute left-0 top-[50%] w-72 h-72 bg-white rounded-full filter blur-[60px] opacity-10 z-0" />
        {/* <StarsBackground /> */}
        <div className="relative z-10 text-center px-4">
        {/* <Gradientbutton /> */}
        <div className="mt-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
           Crypto Casino
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Test your{' '}  <span className="bg-gradient-to-r from-[#8A46FF] to-[#02FDEF] text-transparent bg-clip-text">LUCK</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Bid on different games, and win big!
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-black text-white rounded-lg font-medium  transition-colors shadow-lg shadow-purple-500/25">
            <Link href={"https://t.me/kuiperprotocol"}>
              Telegram
              </Link>
              
            </button>
            <button className="px-8 py-3 bg-black text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-400/25">
            <Link href={""}>
              Docs
              </Link>
            </button>
          </div> */}
          </div>
        </div>
      </div>
    )
  }

