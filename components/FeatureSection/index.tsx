"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Define the icon types we support (add more as needed)
type IconName = keyof typeof LucideIcons

interface FeatureSectionProps {
  badge?: string
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  iconName: IconName
  iconSize?: number
  iconColor?: string
  reversed?: boolean
  badgeIcon?: React.ReactNode
}

export default function FeatureSection({
  badge,
  title,
  description,
  buttonText = "Get Access Now",
  buttonLink = "#",
  iconName,
  iconSize = 180,
  iconColor,
  reversed = false,
  badgeIcon
}: FeatureSectionProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  if (!mounted) return null

  const isDark = theme === 'dark'
  const defaultIconColor = isDark ? '#CCFF00' : '#3B82F6'
  const actualIconColor = iconColor || defaultIconColor

  // Get the icon component from the name
  const IconComponent = LucideIcons[iconName] as LucideIcon

  return (
    <section className="w-full py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-16`}>
          {/* Text Content */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {badge && (
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-black border border-primary/30 dark:border-[#CCFF00]/30 text-primary dark:text-[#CCFF00] shadow-sm">
                  {badgeIcon && <span className="mr-1">{badgeIcon}</span>}
                  {badge}
                </span>
              </motion.div>
            )}
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-base md:text-lg"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            
            {buttonText && (
              <motion.div variants={itemVariants}>
                <a 
                  href={buttonLink} 
                  className="inline-block px-6 py-3 rounded-full bg-primary text-white dark:bg-[#CCFF00] dark:text-black font-medium hover:bg-primary/90 dark:hover:bg-[#CCFF00]/90 transition-colors duration-300 shadow-md hover:shadow-lg dark:shadow-[#CCFF00]/20"
                >
                  {buttonText}
                </a>
              </motion.div>
            )}
          </motion.div>
          
          {/* Icon Container */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-2xl dark:shadow-[#CCFF00]/5">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 dark:from-[#CCFF00]/5 dark:to-[#CCFF00]/10 backdrop-blur-sm"></div>
              
              <motion.div
                initial={{ scale: 0.8, rotate: -5 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15,
                  delay: 0.3
                }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {IconComponent && (
                  <IconComponent
                    size={iconSize} 
                    color={actualIconColor} 
                    strokeWidth={1.5}
                    className="drop-shadow-xl"
                  />
                )}
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-primary/10 dark:bg-[#CCFF00]/10 blur-xl"></div>
                <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-primary/10 dark:bg-[#CCFF00]/10 blur-xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
