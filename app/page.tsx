import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"

// Sample navigation items
const navItems = [
  {
    label: "Features",
    link: "#features",
  },
  {
    label: "Courses",
    link: "#courses",
    subItems: [
      {
        label: "Forex",
        link: "#forex",
      },
      {
        label: "Crypto",
        link: "#crypto",
      },
      {
        label: "Stocks",
        link: "#stocks",
      },
      {
        label: "Indices",
        link: "#indices",
      },
    ],
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
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar items={navItems} brand="RAJABI" />

      {/* Content with padding for the navbar */}
      <div className="pt-24">
        {/* Hero Section */}
        <Hero
          title="Advanced Trading Platform"
          description="Unlock the power of advanced trading with our institutional-grade indicators and tools."
          earlyAccessText="Get Early Access"
          earlyAccessLink="#early-access"
          joinNowText="Join Now"
          joinNowLink="#join-now"
        />

        {/* Chart Section */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-20">
          <div className="w-full h-[400px] rounded-xl overflow-hidden">
            <div className="w-full h-full bg-gray-100 dark:bg-black/60 flex items-center justify-center">
              <p className="text-muted-foreground">Trading chart visualization goes here</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

