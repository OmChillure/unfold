import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import RaffleBanner from "./components/Discount";
import CasinoGames from "./components/Games";
import Footer from "./components/Footer";
import RecentGames from "./components/Players";
import Trading from './pages/trading';
import Circle from './pages/circle';
import Memecoin from './pages/memecoin';
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex justify-center items-center">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <div className="flex justify-center items-center">
              <RaffleBanner />
            </div>
            <CasinoGames />
            <RecentGames />
            <Footer />
          </>
        } />
        <Route path="/trading" element={<Trading />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/baccarat" element={<Memecoin />} />
      </Routes>
    </Router>
  );
}

export default App;
