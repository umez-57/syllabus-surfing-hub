import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star, ArrowRight, Sparkles } from "lucide-react"
import { BeamsBackground } from "@/components/ui/beams-background"

export default function Index() {
  return (
    <BeamsBackground intensity="medium" className="min-h-screen overflow-hidden">
      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-7xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/80">VIT-AP Study Platform 2.0</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
            >
              VIT AP
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Study Hub
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/70 mb-4 max-w-4xl mx-auto"
            >
              Your Gateway to Academic Excellence
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-white/50 mb-12"
            >
              Featuring SCOPE syllabus • More departments coming soon
            </motion.p>

            {/* Search Section - Full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-full mx-auto mb-16"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <SearchBar />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section - Revamped */}
        <section className="container mx-auto px-4 py-20 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-0 left-10 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10"
          >
            {/* Section Header */}
            <div className="text-center mb-14">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="mb-4 inline-block"
              >
                <div className="py-1 px-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm text-sm font-medium text-white/80">
                  Our Impact
                </div>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
              >
                The Numbers Speak
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.7 }}
                className="text-white/60 max-w-xl mx-auto"
              >
                Growing consistently with the academic needs of VIT-AP students
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: BookOpen, label: "Syllabi", value: "500+", color: "from-blue-600 to-cyan-600" },
                { icon: Users, label: "Students", value: "10K+", color: "from-violet-600 to-purple-600" },
                { icon: Download, label: "Downloads", value: "50K+", color: "from-green-600 to-emerald-600" },
                { icon: Star, label: "Rating", value: "4.9", color: "from-amber-500 to-orange-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 1.6 + index * 0.15, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <div className="h-full perspective-1000">
                    <div className="relative p-6 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl text-center hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                      
                      {/* 3D rotation effect on hover */}
                      <motion.div 
                        whileHover={{ 
                          rotateX: 5,
                          rotateY: 5,
                          transition: { duration: 0.2 }
                        }}
                        className="relative z-10 flex flex-col items-center"
                      >
                        {/* Icon container with pulsing effect */}
                        <div className={`relative mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${stat.color} opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700`}></div>
                          <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                            <stat.icon className="w-7 h-7 text-white" />
                          </div>
                        </div>
                        
                        {/* Value with counter-like animation */}
                        <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0 + index * 0.15, duration: 0.5 }}
                          >
                            {stat.value}
                          </motion.span>
                          
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.2 + index * 0.15, duration: 0.3, type: "spring" }}
                            className="ml-1 text-base font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">+</span>
                          </motion.span>
                        </div>
                        
                        {/* Label */}
                        <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Study Hub?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of academic resources with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Smart Search",
                description: "Find exactly what you need with our AI-powered search engine",
                icon: "🔍",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                title: "Real-time Updates",
                description: "Get notified instantly when new materials are uploaded",
                icon: "⚡",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                title: "Community Driven",
                description: "Built by students, for students with collaborative features",
                icon: "🤝",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.2, duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl" />
                <div className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 mb-6">{feature.description}</p>
                  <div className="flex items-center text-white/80 hover:text-white transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <SpeedInsights />
      <Footer />
    </BeamsBackground>
  )
}
