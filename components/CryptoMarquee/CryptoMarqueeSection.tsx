import CryptoMarquee from "./CryptoMarquee"

interface CryptoMarqueeSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function CryptoMarqueeSection({
  title = "Supported Cryptocurrencies",
  subtitle = "Trade all major cryptocurrencies with our advanced indicators and AI-powered signals",
  className = "",
}: CryptoMarqueeSectionProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 mb-8">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">{title}</h2>
        )}
        {subtitle && <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
      </div>

      <CryptoMarquee speed={10} iconSize={70} />
    </section>
  )
}

