"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

// Cryptocurrency data with names and colors
const cryptoData = [
  { name: "Bitcoin", symbol: "BTC"},
  { name: "Ethereum", symbol: "ETH"},
  { name: "Binance Coin", symbol: "BNB"},
  { name: "Solana", symbol: "SOL"},
  { name: "Cardano", symbol: "ADA"},
  { name: "XRP", symbol: "XRP"},
  { name: "Polkadot", symbol: "DOT"},
  { name: "Dogecoin", symbol: "DOGE"},
  { name: "Avalanche", symbol: "AVAX"},
  { name: "Chainlink", symbol: "LINK"},
  { name: "Polygon", symbol: "MATIC"},
  { name: "Litecoin", symbol: "LTC"},
  { name: "Uniswap", symbol: "UNI"},
  { name: "Algorand", symbol: "ALGO"},
  { name: "Stellar", symbol: "XLM"},
]

interface CryptoMarqueeProps {
  speed?: number
  className?: string
  iconSize?: number
  showNames?: boolean
}

export default function CryptoMarquee({
  speed = 30,
  className = "",
  iconSize = 60,
  showNames = true,
}: CryptoMarqueeProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"
  const duration = cryptoData.length * (100 / speed)

  // Duplicate the array to create a seamless loop
  const marqueeItems = [...cryptoData, ...cryptoData]

  return (
    <div className={`w-full overflow-hidden py-6 ${className}`}>
      <div className="relative">
        <motion.div
          className="flex"
          animate={{
            x: [`0%`, `-${cryptoData.length * 100}%`],
          }}
          transition={{
            x: {
              duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0,
              delay: 0,
              type: "tween",
              stiffness: 100,
              damping: 20,
              mass: 1,
              bounce: 0,

            },
          }}
        >
          {marqueeItems.map((crypto, index) => (
            <div
              key={`${crypto.symbol}-${index}`}
              className="flex flex-col items-center justify-center mx-4 md:mx-6"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: hoveredIndex === index ? 360 : 0,
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                transition={{
                  rotateY: { duration: 1.5, ease: "easeInOut" },
                  scale: { duration: 0.3 },
                }}
                style={{ perspective: 1000 }}
              >
                <div
                  className={`
                    flex items-center justify-center rounded-full 
                    ${hoveredIndex === index ? "shadow-xl" : "shadow-lg"}
                    transform-gpu transition-all duration-300
                  `}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    background: `linear-gradient(135deg, transparent 0%, ${crypto.symbol} 100%)`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 10px 25px -5px transparent 40, 0 8px 10px -6px transparent 30`
                        : `0 4px 6px -1px transparent 20, 0 2px 4px -2px transparent 10`,
                    transform: `perspective(1000px) rotateX(10deg) rotateY(${hoveredIndex === index ? "180deg" : "0deg"})`,
                  }}
                >
                  <span className="text-white font-bold text-lg md:text-xl">{crypto.symbol}</span>
                </div>

                {/* 3D effect elements */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 blur-sm"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, transparent , transparent 70%)`,
                    transform: "translateZ(-10px)",
                  }}
                />

                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
                    transform: "translateZ(2px) rotateX(-10deg)",
                  }}
                />
              </motion.div>

              {showNames && (
                <span
                  className={`
                    mt-2 text-xs md:text-sm font-medium
                    ${isDark ? "text-gray-300" : "text-gray-700"}
                    ${hoveredIndex === index ? "opacity-100" : "opacity-70"}
                    transition-opacity duration-300
                  `}
                >
                  {crypto.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to darken/lighten colors
// function adjustColor(hex: string, amount: number): string {
//   // Remove # if present
//   hex = hex.replace("#", "")

//   // Convert to RGB
//   const r = Number.parseInt(hex.substring(0, 2), 16)
//   const g = Number.parseInt(hex.substring(2, 4), 16)
//   const b = Number.parseInt(hex.substring(4, 6), 16)

//   // Adjust
//   const adjustR = Math.max(0, Math.min(255, r + amount))
//   const adjustG = Math.max(0, Math.min(255, g + amount))
//   const adjustB = Math.max(0, Math.min(255, b + amount))

//   // Convert back to hex
//   return `#${adjustR.toString(16).padStart(2, "0")}${adjustG.toString(16).padStart(2, "0")}${adjustB.toString(16).padStart(2, "0")}`
// }

