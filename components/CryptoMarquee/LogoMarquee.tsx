"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

// Logo data with names and image paths
const logoData = [
  { name: "Bybit", path: "/placeholder.svg?height=40&width=120" },
  { name: "Binance", path: "/placeholder.svg?height=40&width=120" },
  { name: "Bitcoin", path: "/logos/bitcoin.svg?height=40&width=120" },
  { name: "Meta", path: "/placeholder.svg?height=40&width=120" },
  { name: "BingX", path: "/placeholder.svg?height=40&width=120" },
  { name: "Bybit", path: "/placeholder.svg?height=40&width=120" }, // Repeated to match image
]

interface LogoMarqueeProps {
  speed?: number
  className?: string
  autoScroll?: boolean
}

export default function LogoMarquee({ speed = 30, className = "", autoScroll = false }: LogoMarqueeProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"
  const duration = logoData.length * (100 / speed)

  return (
    <div className={`w-full overflow-hidden ${isDark ? "bg-black" : "bg-gray-900"} py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between"
          animate={
            autoScroll
              ? {
                  x: [`0%`, `-${100}%`],
                }
              : {}
          }
          transition={
            autoScroll
              ? {
                  x: {
                    duration,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }
              : {}
          }
        >
          {logoData.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="mx-4 md:mx-8 flex items-center justify-center">
              <div className="relative h-8 md:h-10">
                {/* Replace with actual logo images */}
                <div className="text-white text-xl font-bold opacity-80 hover:opacity-100 transition-opacity">
                  {logo.name}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

