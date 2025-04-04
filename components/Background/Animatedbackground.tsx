"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
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

    // Particle settings
    const particleCount = 100
    const particleSize = 1
    const particleMinSpeed = 0.2
    const particleMaxSpeed = 0.8
    const connectionDistance = 150
    const isDark = theme === "dark"

    // Create particles
    const particles: {
      x: number
      y: number
      directionX: number
      directionY: number
      size: number
      color: string
      speed: number
    }[] = []

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * particleSize + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const directionX = Math.random() * 2 - 1
      const directionY = Math.random() * 2 - 1
      const speed = Math.random() * (particleMaxSpeed - particleMinSpeed) + particleMinSpeed

      particles.push({
        x,
        y,
        directionX,
        directionY,
        size,
        color: isDark ? "#CCFF00" : "#3B82F6",
        speed,
      })
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(249, 250, 251, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.x += p.directionX * p.speed
        p.y += p.directionY * p.speed

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) {
          p.directionX = -p.directionX
        }

        if (p.y < 0 || p.y > canvas.height) {
          p.directionY = -p.directionY
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / connectionDistance
            ctx.beginPath()
            ctx.strokeStyle = isDark ? `rgba(204, 255, 0, ${opacity * 0.15})` : `rgba(59, 130, 246, ${opacity * 0.15})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
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

