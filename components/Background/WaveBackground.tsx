"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface WaveBackgroundProps {
  className?: string
}

export default function WaveBackground({ className = "" }: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Wave settings
    const isDark = theme === "dark"
    const waveCount = 3
    const waves = Array.from({ length: waveCount }, (_, i) => ({
      amplitude: 25 + i * 15,
      frequency: 0.005 + i * 0.002,
      speed: 0.05 - i * 0.01,
      phase: 0,
      color: isDark ? `rgba(204, 255, 0, ${0.03 - i * 0.005})` : `rgba(59, 130, 246, ${0.03 - i * 0.005})`,
    }))

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw waves
      waves.forEach((wave) => {
        wave.phase += wave.speed

        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [mounted, theme])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`} />
}

