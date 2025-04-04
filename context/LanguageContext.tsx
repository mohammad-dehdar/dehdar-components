"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Language = "en" | "fa"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.resources": "Resources",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.documentation": "Documentation",
    "nav.api": "API Reference",
    "nav.tutorials": "Tutorials",
    "nav.company": "Company",
    "nav.team": "Team",
    "nav.careers": "Careers",

    // Hero Section
    "hero.title": "Elevate Your Trading with Advanced Institutional Indicators",
    "hero.description":
      "Trade in Forex, Cryptocurrencies, Index, and Stocks effortlessly. Our indicators identify 'bottoms' and 'tops' thanks to advanced Artificial Intelligence, adapting and updating according to market trends, enhancing your profits.",
    "hero.cta.access": "Early Access",
    "hero.cta.join": "Join Now",

    // Partners Section
    "partners.title": "Our Partners",
    "partners.subtitle": "We work with the leading exchanges and platforms in the cryptocurrency industry",

    // Feature Sections
    "feature.backtesting.badge": "NEXT-GEN BACKTESTING",
    "feature.backtesting.title": "Easily build powerful strategies",
    "feature.backtesting.description":
      "Our Backtesting System™ unites signals, price action, AI, and the rest of TA in a slick, end-to-end solution to help you build & test your trading strategies.",
    "feature.backtesting.button": "Get Access Now",

    "feature.analytics.badge": "ADVANCED ANALYTICS",
    "feature.analytics.title": "Identify market patterns instantly",
    "feature.analytics.description":
      "Our AI-powered analytics engine detects complex market patterns and correlations that would take hours to find manually, giving you a significant edge in your trading decisions.",
    "feature.analytics.button": "Explore Analytics",

    "feature.signals.badge": "REAL-TIME SIGNALS",
    "feature.signals.title": "Never miss a trading opportunity",
    "feature.signals.description":
      "Get instant notifications when our system detects high-probability trading setups across multiple timeframes and markets, allowing you to act quickly on emerging opportunities.",
    "feature.signals.button": "View Signals",

    // Language Switcher
    "language.english": "English",
    "language.persian": "فارسی",
  },
  fa: {
    // Navigation
    "nav.features": "ویژگی‌ها",
    "nav.resources": "منابع",
    "nav.pricing": "قیمت‌گذاری",
    "nav.about": "درباره ما",
    "nav.documentation": "مستندات",
    "nav.api": "مرجع API",
    "nav.tutorials": "آموزش‌ها",
    "nav.company": "شرکت",
    "nav.team": "تیم",
    "nav.careers": "فرصت‌های شغلی",

    // Hero Section
    "hero.title": "ارتقاء معاملات خود با شاخص‌های پیشرفته سازمانی",
    "hero.description":
      "معامله در فارکس، ارزهای دیجیتال، شاخص و سهام به راحتی. شاخص‌های ما با استفاده از هوش مصنوعی پیشرفته، «کف» و «سقف» را شناسایی می‌کنند و با تطبیق و به‌روزرسانی بر اساس روندهای بازار، سود شما را افزایش می‌دهند.",
    "hero.cta.access": "دسترسی زودهنگام",
    "hero.cta.join": "پیوستن",

    // Partners Section
    "partners.title": "شرکای ما",
    "partners.subtitle": "ما با پیشروترین صرافی‌ها و پلتفرم‌ها در صنعت ارزهای دیجیتال همکاری می‌کنیم",

    // Feature Sections
    "feature.backtesting.badge": "بک‌تستینگ نسل جدید",
    "feature.backtesting.title": "به راحتی استراتژی‌های قدرتمند بسازید",
    "feature.backtesting.description":
      "سیستم بک‌تستینگ ما سیگنال‌ها، اکشن قیمت، هوش مصنوعی و بقیه تحلیل تکنیکال را در یک راه‌حل یکپارچه و ساده ترکیب می‌کند تا به شما در ساخت و آزمایش استراتژی‌های معاملاتی کمک کند.",
    "feature.backtesting.button": "دریافت دسترسی",

    "feature.analytics.badge": "تحلیل پیشرفته",
    "feature.analytics.title": "الگوهای بازار را فوراً شناسایی کنید",
    "feature.analytics.description":
      "موتور تحلیلی مبتنی بر هوش مصنوعی ما الگوها و همبستگی‌های پیچیده بازار را که به صورت دستی ساعت‌ها طول می‌کشد، شناسایی می‌کند و به شما مزیت قابل توجهی در تصمیمات معاملاتی می‌دهد.",
    "feature.analytics.button": "کاوش تحلیل‌ها",

    "feature.signals.badge": "سیگنال‌های بلادرنگ",
    "feature.signals.title": "هرگز فرصت معاملاتی را از دست ندهید",
    "feature.signals.description":
      "هنگامی که سیستم ما تنظیمات معاملاتی با احتمال بالا را در چندین بازه زمانی و بازار تشخیص می‌دهد، اعلان‌های فوری دریافت کنید تا بتوانید سریعاً در فرصت‌های نوظهور اقدام کنید.",
    "feature.signals.button": "مشاهده سیگنال‌ها",

    // Language Switcher
    "language.english": "English",
    "language.persian": "فارسی",
  },
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")
  const [direction, setDirection] = useState<Direction>("ltr")

  // Update direction when language changes
  useEffect(() => {
    setDirection(language === "fa" ? "rtl" : "ltr")

    // Update HTML dir attribute
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr"

    // Store language preference
    localStorage.setItem("language", language)
  }, [language])

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fa")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
  }

  return <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

