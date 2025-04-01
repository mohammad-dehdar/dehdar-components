import React from 'react'

interface HeroProps {
    title: string
    description: string
    earlyAccessText: string
    earlyAccessLink: string
    joinNowText: string
    joinNowLink: string
}

function Hero({
    title,
    description,
    earlyAccessText,
    earlyAccessLink,
    joinNowText,
    joinNowLink,
}: HeroProps) {
    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 dark:neon-text">
                {title}
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-10 text-muted-foreground">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                    href={earlyAccessLink}
                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors neon-button"
                >
                    {earlyAccessText}
                </a>
                <a
                    href={joinNowLink}
                    className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                >
                    {joinNowText}
                </a>
            </div>
        </section>
    )
}

export default Hero