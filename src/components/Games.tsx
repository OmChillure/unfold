import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";

export default function RecentGames() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen p-8 bg-[#071425]">
      <div className="max-w-7xl  mx-auto mt-60 bg-[#071425]">
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          Play Our Exciting Games
        </h1>
        <h3 className="font-normal text-2xl text-white text-center mb-12">
          Choose one out of our three games and earn a boatload of money!!
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {/* Blackjack Card */}
          <Card className="bg-blue-950/50 backdrop-blur-sm border border-white/10 w-80 h-96 flex flex-col">
            <CardHeader className="p-0 mb-24">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/placeholder.svg?height=192&width=320"
                  alt="Blackjack"
                  className="rounded-t-lg w-full h-full object-cover"
                />
              </div>
            </CardHeader>
              <CardTitle className="text-xl text-purple-200 text-center">
                Blackjack
              </CardTitle>
            {/* <CardBody className="flex-grow">
              <p className="text-center text-gray-200">
                Experience the thrill of Blackjack and test your strategy skills!
              </p>
            </CardBody> */}
            <CardFooter className="mt-2">
              <Button
                onClick={() => handleNavigation("/blackjack")}
                className="w-full"
              >
                Play Now
              </Button>
            </CardFooter>
          </Card>

          {/* American Roulette Card */}
          <Card className="bg-blue-950/50 backdrop-blur-sm border border-white/10 w-80 h-96 flex flex-col">
            <CardHeader className="p-0 mb-24">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/fort.png"
                  alt="American Roulette"
                  className="rounded-t-lg w-full h-80 object-cover"
                />
              </div>
            </CardHeader>
              <CardTitle className="text-xl  text-purple-200 text-center">
                American Roulette
              </CardTitle>
            {/* <CardBody className="flex-grow">
              <p className="text-center text-gray-200">
                Spin the wheel and try your luck with American Roulette!
              </p>
            </CardBody> */}
            <CardFooter className="mt-2">
              <Button
                onClick={() => handleNavigation("/circle")}
                className="w-full"
              >
                Play Now
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-blue-950/50 backdrop-blur-sm border border-white/10 w-80 h-96 flex flex-col">
            <CardHeader className="p-0 mb-24">
              <div className="relative w-full h-48 mb-4">
                <img
                  src="/fud.png"
                  alt="fud"
                  className="rounded-t-lg w-full h-full object-cover mt-20"
                />
              </div>
            </CardHeader>
              <CardTitle className="text-xl  text-purple-200 text-center">
                Predict Memcoin
              </CardTitle>
            {/* <CardBody className="flex-grow">
              <p className="text-center text-gray-200">
                Enjoy the elegance and excitement of Baccarat!
              </p>
            </CardBody> */}
            <CardFooter className="mt-2">
              <Button
                onClick={() => handleNavigation("/baccarat")}
                className="w-full"
              >
                Play Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
