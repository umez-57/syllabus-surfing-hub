// src/pages/Index.tsx
import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import BlurText from "@/components/BlurText"
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function Index() {
  return (
    <div className="relative min-h-screen bg-black">
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      <main className="flex items-center justify-center min-h-[80vh] pt-16">
        <div className="mx-auto text-center px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight">
            <BlurText
              text="VIT AP"
              delay={150}
              animateBy="words"
              direction="top"
              className="block"
            />
            <BlurText
              text="Study Hub"
              delay={150}
              animateBy="words"
              direction="top"
              className="block mt-2"
            />
          </h1>

          <p className="font-serif text-xl md:text-2xl text-gray-300 mt-6">
            <BlurText
              text="Your Gateway to Academic Clarity at VIT-AP"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </p>

          <p className="font-serif text-md md:text-lg text-gray-400 mt-2">
            <BlurText
              text="Currently featuring SCOPE syllabus. Other departments coming soon!"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </p>

          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </main>

      <SpeedInsights />
      <Footer />
    </div>
  )
}
