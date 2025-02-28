import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { BlurFade } from "@/components/ui/blur-fade"
// 1. Import SpeedInsights
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function Index() {
  return (
    <div className="relative min-h-screen">
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              <BlurFade duration={0.8} className="inline-block">
                VIT AP
              </BlurFade>
              <br />
              <BlurFade duration={0.8} className="inline-block">
                Study Hub
              </BlurFade>
            </h1>

            <p className="font-serif text-xl text-gray-300">
              <BlurFade duration={0.8}>
                Your Gateway to Academic Clarity at VIT-AP
              </BlurFade>
            </p>
            <p className="font-serif text-sm text-gray-400 mt-2">
              <BlurFade duration={0.8}>
                Currently featuring SCOPE syllabus. Other departments coming soon!
              </BlurFade>
            </p>
          </div>

          <SearchBar />
        </div>
      </main>

      {/* 2. Render the SpeedInsights component */}
      <SpeedInsights />

      <Footer />
    </div>
  )
}
