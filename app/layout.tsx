import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import ThemeSwitcher from "@/components/ThemeSwitcher"
import Navbar from "@/components/Navbar"
import { LanguageProvider } from "@/context/LanguageContext"
import WaveBackground from "@/components/Background/WaveBackground"

const inter = Inter({ subsets: ["latin"] })

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
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="trading-platform-theme">
            <div className="min-h-screen transition-colors duration-300">
              {/* Animated Background */}
              <WaveBackground/>

              {/* Theme Switcher - Fixed Position */}
              <div className="fixed bottom-6 right-6 z-50">
                <ThemeSwitcher />
              </div>

              {/* Navbar */}
              <Navbar />

              {/* Main Content */}
              <div className="pt-20">{children}</div>
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

