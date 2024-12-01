import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function RecentGames() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Recent games
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <img
                  src="/placeholder.svg?height=160&width=320"
                  alt="Blackjack"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">Blackjack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Name:</span> Tamara Sour Sr.
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Bet:</span> 5,382.00
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Win:</span> 0.00
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Result:</span> Nothing
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Played:</span> 20 MINUTES AGO
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <img
                  src="/placeholder.svg?height=160&width=320"
                  alt="American Roulette"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">American Roulette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Name:</span> Lavonna Cormier IV
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Bet:</span> 9,822.00
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Win:</span> 0.00
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Result:</span> Nothing
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Played:</span> 20 MINUTES AGO
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <img
                  src="/placeholder.svg?height=160&width=320"
                  alt="Baccarat"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">Baccarat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Name:</span> Kandeem Sanford DDS
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Bet:</span> 15,380.00
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Win:</span> 0.00
                </p>
                <p className="text-sm text-red-400">
                  <span className="font-semibold">Result:</span> Loss
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Played:</span> 9 MINUTES AGO
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="relative w-full h-40 mb-4">
                <img
                  src="/placeholder.svg?height=160&width=320"
                  alt="Lucky Wheel"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">Lucky Wheel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Name:</span> Carly MacShurst
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Bet:</span> 67,550.00
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Win:</span> 0.00
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold">Result:</span> Nothing
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Played:</span> 1 HOUR AGO
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

