"use client"

import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const switchToLanguage = (lang: "en" | "fa") => {
    setLanguage(lang)
    closeDropdown()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="text-sm">{language === "en" ? "EN" : "FA"}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden min-w-[120px] border border-gray-200 dark:border-gray-800"
        >
          <button
            onClick={() => switchToLanguage("en")}
            className={`w-full text-left px-4 py-2 text-sm ${language === "en" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            {t("language.english")}
          </button>
          <button
            onClick={() => switchToLanguage("fa")}
            className={`w-full text-right px-4 py-2 text-sm ${language === "fa" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            {t("language.persian")}
          </button>
        </motion.div>
      )}
    </div>
  )
}

