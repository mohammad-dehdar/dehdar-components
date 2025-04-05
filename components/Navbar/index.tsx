"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import LanguageSwitcher from "../LanguageSwitcher"


interface SubItem {
  label: string
  link?: string
  translationKey: string
}

interface NavItem {
  label: string
  link?: string
  translationKey: string
  subItems?: SubItem[]
}

// Sample navigation items with translation keys
const navItems: NavItem[] = [
  {
    label: "Features",
    link: "#features",
    translationKey: "nav.features",
  },
  {
    label: "Resources",
    link: "#resources",
    translationKey: "nav.resources",
    subItems: [
      {
        label: "Documentation",
        link: "#documentation",
        translationKey: "nav.documentation",
      },
      {
        label: "API Reference",
        link: "#api",
        translationKey: "nav.api",
      },
      {
        label: "Tutorials",
        link: "#tutorials",
        translationKey: "nav.tutorials",
      },
    ],
  },
  {
    label: "Pricing",
    link: "#pricing",
    translationKey: "nav.pricing",
  },
  {
    label: "About",
    link: "#about",
    translationKey: "nav.about",
    subItems: [
      {
        label: "Company",
        link: "#company",
        translationKey: "nav.company",
      },
      {
        label: "Team",
        link: "#team",
        translationKey: "nav.team",
      },
      {
        label: "Careers",
        link: "#careers",
        translationKey: "nav.careers",
      },
    ],
  },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { direction } = useLanguage()

  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobile])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "py-1" : "py-3"}`}>
      <div
        className={`backdrop-blur-md bg-white/20 dark:bg-black/50 border border-t-0 border-white/30 dark:border-[#CCFF00]/20 shadow-lg dark:shadow-[#CCFF00]/10 rounded-b-lg mx-2 sm:mx-4 md:mx-6 lg:mx-8 transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-lg"}`}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 md:py-3">
          {/* Logo or Brand */}
          <div className="text-lg font-semibold text-gray-800 dark:text-[#CCFF00] dark:neon-text">ALGORYTZE</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <ul className={`flex gap-2 lg:gap-6 ${direction === "rtl" ? "flex-row-reverse" : ""}`}>
              {navItems.map((item) => (
                <DesktopNavItem key={item.translationKey} item={item} />
              ))}
            </ul>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              className="text-gray-800 dark:text-[#CCFF00] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <ul className="px-4 pb-4 space-y-2">
                {navItems.map((item) => (
                  <MobileNavItem key={item.translationKey} item={item} />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, direction } = useLanguage()

  return (
    <li className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {/* Main link */}
      <a
        href={item.link || "#"}
        target={item.link ? "_blank" : "_self"}
        className={`block px-2 lg:px-4 py-2 rounded-md transition-all text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-[#CCFF00] relative overflow-hidden group text-sm lg:text-base ${direction === "rtl" ? "text-right" : "text-left"}`}
      >
        {t(item.translationKey)}
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-[#CCFF00]/70 dark:to-[#CCFF00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </a>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && item.subItems && item.subItems.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full min-w-[180px] backdrop-blur-md bg-white/30 dark:bg-black/70 border border-white/30 dark:border-[#CCFF00]/20 shadow-lg dark:shadow-[#CCFF00]/10 rounded-lg z-10 overflow-hidden ${direction === "rtl" ? "right-0" : "left-0"}`}
          >
            {item.subItems.map((subItem) => (
              <li key={subItem.translationKey}>
                <a
                  href={subItem.link || "#"}
                  target={subItem.link ? "_blank" : "_self"}
                  className={`block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-white/40 dark:hover:bg-gray-800/40 dark:hover:text-[#CCFF00] transition-colors duration-200 text-sm ${direction === "rtl" ? "text-right" : "text-left"}`}
                >
                  {t(subItem.translationKey)}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

function MobileNavItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, direction } = useLanguage()

  return (
    <li className="rounded-md overflow-hidden backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/20 dark:border-[#CCFF00]/20">
      {/* Main item */}
      <div className="flex justify-between items-center">
        <a
          href={item.link || "#"}
          target={item.link ? "_blank" : "_self"}
          className={`flex-1 block px-4 py-3 text-gray-800 dark:text-gray-100 ${direction === "rtl" ? "text-right" : "text-left"}`}
        >
          {t(item.translationKey)}
        </a>

        {item.subItems && item.subItems.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-3 text-gray-800 dark:text-[#CCFF00] focus:outline-none"
            aria-label={isOpen ? "Close submenu" : "Open submenu"}
          >
            <span
              className={`block w-2 h-2 border-r-2 border-b-2 border-gray-800 dark:border-[#CCFF00] transform transition-transform duration-200 ${isOpen ? "rotate-[-135deg]" : "rotate-45"}`}
            />
          </button>
        )}
      </div>

      {/* Submenu */}
      <AnimatePresence>
        {isOpen && item.subItems && item.subItems.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white/20 dark:bg-black/50 border-t border-white/20 dark:border-[#CCFF00]/10"
          >
            {item.subItems.map((subItem) => (
              <li key={subItem.translationKey}>
                <a
                  href={subItem.link || "#"}
                  target={subItem.link ? "_blank" : "_self"}
                  className={`block px-6 py-2 text-gray-800 dark:text-gray-100 hover:bg-white/30 dark:hover:bg-[#CCFF00]/10 dark:hover:text-[#CCFF00] transition-colors duration-200 ${direction === "rtl" ? "text-right" : "text-left"}`}
                >
                  {t(subItem.translationKey)}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}

