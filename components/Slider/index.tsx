"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Sample data - replace with your own
const slides = [
  {
    id: 1,
    image: "/1.jpg",
    title: "Modern Design Solutions",
    description: "Creating beautiful digital experiences that engage and inspire.",
  },
  {
    id: 2,
    image: "/2.jpg",
    title: "Innovative Technology",
    description: "Leveraging cutting-edge tools to build the future of web.",
  },
  {
    id: 3,
    image: "/3.jpg",
    title: "Creative Excellence",
    description: "Pushing boundaries with thoughtful and impactful design.",
  },
]

export default function ModernSlider() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass:
            "inline-block w-2 h-2 rounded-full bg-gray-400 opacity-50 mx-1 transition-all duration-300 cursor-pointer",
          bulletActiveClass: "!opacity-100 !bg-white w-3 h-3",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full  overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[60vh] min-h-[400px] w-full">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-sm md:text-base max-w-md mb-6 text-gray-200">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev absolute top-1/2 left-4 z-10 -translate-y-1/2 w-20 h-20 flex items-center justify-center rounded-full  opacity-0 group-hover:opacity-100 transition-all px-5 duration-300 hover:scale-150">
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button className="swiper-button-next text-red-300 absolute top-1/2 right-4 z-10 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full  opacity-0 group-hover:opacity-100 transition-all px-5 duration-300 hover:scale-150">
        <ChevronRight className="w-6 h-6"/>
        <span className="sr-only">Next slide</span>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center"></div>
    </div>
  )
}

