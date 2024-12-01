'use client'

// import * as React from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
import { ConnectButton } from "@mysten/dapp-kit"
import { Box } from "@radix-ui/themes";


export default function Navbar() {
  return (
      <header className="fixed top-3 border rounded-full bg-cyan-900/10 backdrop-blur-3xl border-white/10 w-[70%] h-18 px-8 pr-3 z-50 mt-10 ">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 mr-8">
            <span className={`font-semibold text-xl`}>SuiPlay</span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm">          
            <a href="/" className="text-gray-400 hover:text-white">
              Games
            </a>
            
            <a href="/" className="text-gray-400 hover:text-white">
              Documentation
            </a>
            
          </nav>
          <Box className="float-right ml-[59%]">
          <ConnectButton style={{
            borderRadius: "9999px",
            height:"42px"
          }}/>
        </Box>
        </div>
      </header>
  )
}