import { ArrowUpRight, DiscIcon as Discord, TextIcon as Telegram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className=" text-white py-12 bg-[#071425]">
      <div className="w-[99%] mx-auto px-4 mt-40">
        {/* Title */}
        <h2 className="text-6xl font-bold text-center mb-12 tracking-wider">
          Crypto Casino
        </h2>

        {/* Social Links Bar */}
        <div className="grid grid-cols-5 gap-4 mb-16 max-w-4xl mx-auto">
          {["DISCORD", "TELEGRAM", "MEDIUM", "DISCORD", "LINKEDIN"].map((platform) => (
            <a
              href="#"
              key={platform}
              className="flex items-center justify-center py-3 border-t border-white/10 hover:border-white/30 transition-colors group"
            >
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {platform}
              </span>
              <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Logo Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
              <span className="font-semibold">Crypto Casino</span>
            </div>
            <p className="text-sm text-gray-400">
              A decentralized crypto game, with
            </p>
          </div>

          {/* Footer Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Purchase</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Provably fair</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Follow us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Discord className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Telegram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="text-sm text-gray-400">
            Copyright © 2023 Crypto casino
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

