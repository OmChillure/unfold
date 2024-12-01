import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

export default function RecentGames() {
  const navigate = useNavigate();

  const handleNavigation = (path: any) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen p-8 mt-[10%]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Recent games
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10 w-96 h-96">
            <CardHeader className="p-0">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/placeholder.svg?height=192&width=320"
                  alt="Blackjack"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">Blackjack</CardTitle>
            </CardHeader>
            <Button onClick={() => handleNavigation('/trading')}>
              Play now
            </Button>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10 w-96 h-96">
            <CardHeader className="p-0">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/placeholder.svg?height=192&width=320"
                  alt="American Roulette"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">American Roulette</CardTitle>
            </CardHeader>
            <Button onClick={() => handleNavigation('/circle')}>
              Play now
            </Button>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border-white/10 w-96 h-96">
            <CardHeader className="p-0">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/placeholder.svg?height=192&width=320"
                  alt="Baccarat"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-purple-200">Baccarat</CardTitle>
            </CardHeader>
            <Button onClick={() => handleNavigation('/baccarat')}>
              Play now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
