import { Sparkles, BarChart3, LineChart } from "lucide-react"
import FeatureSection from "@/components/FeatureSection"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-[#CCFF00] dark:neon-text">
          Elevate Your Trading with
          <br className="hidden sm:block" />
          Advanced Institutional Indicators
        </h2>
        <p className="text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-10 text-gray-600 dark:text-gray-300">
          Trade in Forex, Cryptocurrencies, Index, and Stocks effortlessly. Our indicators identify 'bottoms' and 'tops'
          thanks to advanced Artificial Intelligence, adapting and updating according to market trends, enhancing your
          profits.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#early-access"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-primary text-white dark:bg-[#CCFF00] dark:text-black font-medium hover:bg-primary/90 dark:hover:bg-[#CCFF00]/90 transition-colors"
          >
            Early Access
          </a>
          <a
            href="#join-now"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Join Now
          </a>
        </div>
      </section>

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
        badge="NEXT-GEN BACKTESTING"
        badgeIcon={<Sparkles size={14} />}
        title="Easily build powerful strategies"
        description="Our Backtesting System™ unites signals, price action, AI, and the rest of TA in a slick, end-to-end solution to help you build & test your trading strategies."
        buttonText="Get Access Now"
        buttonLink="#access"
        iconName="TrendingUp"
        iconSize={180}
      />

      <FeatureSection
        badge="ADVANCED ANALYTICS"
        badgeIcon={<BarChart3 size={14} />}
        title="Identify market patterns instantly"
        description="Our AI-powered analytics engine detects complex market patterns and correlations that would take hours to find manually, giving you a significant edge in your trading decisions."
        buttonText="Explore Analytics"
        buttonLink="#analytics"
        iconName="BarChart2"
        iconSize={180}
        reversed={true}
      />

      <FeatureSection
        badge="REAL-TIME SIGNALS"
        badgeIcon={<LineChart size={14} />}
        title="Never miss a trading opportunity"
        description="Get instant notifications when our system detects high-probability trading setups across multiple timeframes and markets, allowing you to act quickly on emerging opportunities."
        buttonText="View Signals"
        buttonLink="#signals"
        iconName="Zap"
        iconSize={180}
      />

      <FeatureSection
        badge="AI PREDICTIONS"
        badgeIcon={<Sparkles size={14} />}
        title="Forecast market movements"
        description="Leverage the power of artificial intelligence to predict potential market movements and identify high-probability trade setups before they become obvious to the majority of traders."
        buttonText="Learn More"
        buttonLink="#ai"
        iconName="BrainCircuit"
        iconSize={180}
        reversed={true}
      />

      <FeatureSection
        badge="PERFORMANCE METRICS"
        badgeIcon={<BarChart3 size={14} />}
        title="Track and optimize your results"
        description="Comprehensive performance analytics help you understand your trading strengths and weaknesses, allowing you to refine your approach and consistently improve your results."
        buttonText="View Metrics"
        buttonLink="#metrics"
        iconName="BarChart3"
        iconSize={180}
      />
    </main>
  )
}

