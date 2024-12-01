import { Bot, Share2, LineChart, Users } from 'lucide-react'
import { Card, CardContent } from "../components/ui/card"

export default function About() {
  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-20">
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-900 rounded-full opacity-20 blur-[100px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
          Level Up your Trading Game
        </h1>

        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Alera Protcol is an all-in-one crypto prediction platform that provides you with the tools you need to make informed trading decisions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-emerald-950/50 border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 mx-auto">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Mobile Notifications</h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay updated with real-time alerts and notifications directly to your mobile device, ensuring you never miss a beat.
              </p>
             
            </CardContent>
          </Card>

          <Card className="bg-emerald-950/50 border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 mx-auto">
                <Share2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Rust Based Prediction System</h3>
              <p className="text-gray-400 text-sm mb-4">
                Leverage the power of Rust for fast and reliable price predictions, helping you make informed trading decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-950/50 border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 mx-auto">
                <LineChart className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Custom Charts</h3>
              <p className="text-gray-400 text-sm mb-4">
                Create and personalize your own charts with our advanced charting tools, tailored to fit your trading strategy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-950/50 border-emerald-900/50 hover:border-emerald-500/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 mx-auto">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white text-lg font-medium mb-2">Minimal Price</h3>
              <p className="text-gray-400 text-sm mb-4">
                Enjoy our platform with minimal costs, providing you with the best tools without breaking the bank.
              </p>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
