import { Button } from './ui/button'

function Hero() {
  return (
    <div className="relative text-center pt-20 mt-52 pb-32 px-4">
    <div className="absolute inset-0 mix-blend-multiply"></div>
    <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      Crypto Casino
    </h1>
    <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 relative z-10" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      Try your luck
    </h2>
    <p className="text-gray-300 mb-8 relative z-10">
      Fair online gaming platform. Can you beat other players?
    </p>
    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg relative z-10">
      Leaderboard
    </Button>
  </div>
  )
}

export default Hero