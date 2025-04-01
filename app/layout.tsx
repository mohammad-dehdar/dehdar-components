import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes" 
import ThemeSwitcher from "@/components/ThemeSwitcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Trading Platform",
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
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-300">
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeSwitcher />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

