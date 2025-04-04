"use client"

import { Sparkles, BarChart3, LineChart } from "lucide-react"
import FeatureSection from "@/components/FeatureSection"
import LogoMarquee from "@/components/CryptoMarquee/LogoMarquee"
import { useLanguage } from "@/context/LanguageContext"

export default function Home() {
  const { t, direction } = useLanguage()

  return (
    <main className={direction === "rtl" ? "font-[Vazirmatn]" : ""}>
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-[#CCFF00] dark:neon-text ${direction === "rtl" ? "leading-normal" : ""}`}
        >
          {t("hero.title")}
        </h2>
        <p className="text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-10 text-gray-600 dark:text-gray-300">
          {t("hero.description")}
        </p>
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${direction === "rtl" ? "sm:flex-row-reverse" : ""}`}
        >
          <a
            href="#early-access"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-primary text-white dark:bg-[#CCFF00] dark:text-black font-medium hover:bg-primary/90 dark:hover:bg-[#CCFF00]/90 transition-colors"
          >
            {t("hero.cta.access")}
          </a>
          <a
            href="#join-now"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {t("hero.cta.join")}
          </a>
        </div>
      </section>

      {/* Logo Marquee */}
      {/* <LogoMarquee className="my-8" /> */}

      {/* Chart Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-gray-200 dark:border-[#CCFF00]/20 bg-white dark:bg-black/60 shadow-lg dark:shadow-[#CCFF00]/10">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Trading chart visualization goes here</p>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <FeatureSection
        badge={t("feature.backtesting.badge")}
        badgeIcon={<Sparkles size={14} />}
        title={t("feature.backtesting.title")}
        description={t("feature.backtesting.description")}
        buttonText={t("feature.backtesting.button")}
        buttonLink="#access"
        iconName="TrendingUp"
        iconSize={180}
        reversed={direction === "rtl"}
      />

      <FeatureSection
        badge={t("feature.analytics.badge")}
        badgeIcon={<BarChart3 size={14} />}
        title={t("feature.analytics.title")}
        description={t("feature.analytics.description")}
        buttonText={t("feature.analytics.button")}
        buttonLink="#analytics"
        iconName="BarChart2"
        iconSize={180}
        reversed={direction === "rtl" ? false : true}
      />

      <FeatureSection
        badge={t("feature.signals.badge")}
        badgeIcon={<LineChart size={14} />}
        title={t("feature.signals.title")}
        description={t("feature.signals.description")}
        buttonText={t("feature.signals.button")}
        buttonLink="#signals"
        iconName="Zap"
        iconSize={180}
        reversed={direction === "rtl"}
      />
    </main>
  )
}

