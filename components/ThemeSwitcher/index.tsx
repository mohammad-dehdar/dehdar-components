"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function ThemeSlider() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <div className="flex items-center">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative h-8 w-16 rounded-full bg-gradient-to-r from-blue-100 to-yellow-100 dark:from-indigo-900 dark:to-gray-900 p-1 transition-colors duration-300"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        <span className="sr-only">{isDark ? "Light" : "Dark"} mode</span>

        {/* Track icons */}
        <span className="absolute left-1.5 top-1.5 text-yellow-500 dark:text-gray-600 transition-opacity duration-300">
          <Sun size={20} />
        </span>
        <span className="absolute right-1.5 top-1.5 text-gray-600 dark:text-indigo-300 transition-opacity duration-300">
          <Moon size={20} />
        </span>

        {/* Slider thumb */}
        <motion.div
          className="h-6 w-6 rounded-full bg-white shadow-md flex items-center justify-center"
          initial={false}
          animate={{
            x: isDark ? 32 : 0,
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <motion.div initial={false} animate={{ opacity: isDark ? 1 : 0 }} className="text-indigo-300">
            {isDark && <Moon size={14} />}
          </motion.div>
          <motion.div initial={false} animate={{ opacity: isDark ? 0 : 1 }} className="absolute text-yellow-500">
            {!isDark && <Sun size={14} />}
          </motion.div>
        </motion.div>
      </button>
    </div>
  )
}

