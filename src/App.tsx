import Navbar from "./components/Navbar";
import "./index.css";
import Hero from "./components/Hero";
import About from "./components/About";
import RaffleBanner from "./components/Discount";
import CasinoGames from "./components/Games";
import Footer from "./components/Footer";
import RecentGames from "./components/Players";

function App() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Navbar />
      </div>
      <Hero />
      <About />
      <div className="flex justify-center items-center">
        <RaffleBanner />
      </div>
      <CasinoGames />
      <RecentGames />
      <Footer />
    </>
  );
}

export default App;
