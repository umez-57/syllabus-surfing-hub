import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import BlurText from "@/components/BlurText"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { motion } from "framer-motion"

export default function Index() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <Hero className="absolute inset-0 -z-10" gradient blur />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl animate-pulse top-[-250px] left-[-200px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl animate-pulse bottom-[-200px] right-[-150px]" />
      </div>

      <Navbar />

      <main className="flex items-center justify-center min-h-[80vh] pt-36">
        <div className="w-full max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative transform-gpu"
              >
                <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-8">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                    VIT AP
                  </span>
                  <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                    Study Hub
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-serif text-xl md:text-2xl text-gray-300 mt-6"
              >
                Your Gateway to Academic Clarity at VIT-AP
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-serif text-md md:text-lg text-gray-400 mt-2 mb-8"
              >
                Currently featuring SCOPE syllabus. Other departments coming soon!
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8"
            >
              <SearchBar />
            </motion.div>
          </motion.div>
        </div>
      </main>

      <SpeedInsights />
      <Footer />
    </div>
  )
}