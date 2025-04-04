import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import Navbar from "@/components/Navbar"
import AnimatedBackground from "@/components/Background/Animatedbackground"
// Uncomment one of these to use a different background pattern
// import GridBackground from "@/components/grid-background"
// import WaveBackground from "@/components/wave-background"

const inter = Inter({ subsets: ["latin"] })

// Sample navigation items
const navItems = [
  {
    label: "Features",
    link: "#features",
  },
  {
    label: "Resources",
    link: "#resources",
    subItems: [
      {
        label: "Documentation",
        link: "#documentation",
      },
      {
        label: "API Reference",
        link: "#api",
      },
      {
        label: "Tutorials",
        link: "#tutorials",
      },
    ],
  },
  {
    label: "Pricing",
    link: "#pricing",
  },
  {
    label: "About",
    link: "#about",
    subItems: [
      {
        label: "Company",
        link: "#company",
      },
      {
        label: "Team",
        link: "#team",
      },
      {
        label: "Careers",
        link: "#careers",
      },
    ],
  },
]

export const metadata: Metadata = {
  title: "ALGORYTZE - Advanced Trading Platform",
  description: "Advanced trading platform with institutional indicators",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="trading-platform-theme">
          <div className="min-h-screen transition-colors duration-300">
            {/* Animated Background */}
            <AnimatedBackground />
            {/* Uncomment one of these to use a different background pattern */}
            {/* <GridBackground /> */}
            {/* <WaveBackground /> */}

            {/* Theme Switcher - Fixed Position */}
            <div className="fixed bottom-6 right-6 z-50">
              <ThemeSwitcher />
            </div>

            {/* Navbar */}
            <Navbar items={navItems} brand="ALGORYTZE" />

            {/* Main Content */}
            <div className="pt-20">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

