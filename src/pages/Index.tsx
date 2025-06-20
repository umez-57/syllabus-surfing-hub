import React from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star, ArrowRight, Sparkles, Search, Zap, Heart } from "lucide-react"

export default function Index() {
  return (
    <div className="min-h-screen monster-dark text-white overflow-hidden relative">
      {/* Animated Background with Glassmorphic Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      {/* Floating Glassmorphic Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full backdrop-blur-xl border border-white/10 floating-shape opacity-40" />

      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero Section - Reduced bottom padding from py-4 to pb-0 (removing 20px bottom padding) */}
        <section className="container mx-auto px-4 pt-4 pb-0">
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
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white font-mono font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>VIT-AP Study Platform 2.0</span>
            </motion.div>

            {/* Enhanced Main Heading with Premium Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mb-8"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tight blur-lg opacity-30">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  VIT AP STUDY HUB
                </span>
              </div>
              
              {/* Main Text with Enhanced Styling */}
              <h1 className="relative text-6xl md:text-8xl font-black tracking-tight leading-[0.9] font-display">
                {/* VIT AP with sophisticated gradient */}
                <motion.span 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="block bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    textShadow: "0 0 40px rgba(255,255,255,0.3)"
                  }}
                >
                  VIT AP
                </motion.span>
                
                {/* STUDY HUB with vibrant gradient and effects */}
                <motion.span 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, -apple-system, sans-serif",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))"
                  }}
                >
                  STUDY HUB
                </motion.span>
              </h1>
              
              {/* Animated Underline with Gradient */}
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                className="h-2 max-w-4xl mx-auto bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full mt-6 shadow-lg shadow-purple-500/30"
              />
              
              {/* Floating Accent Elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -right-8 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-sm opacity-60"
              />
              
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1],
                  y: [0, 10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-6 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-sm opacity-60"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto font-mono text-gray-300"
            >
              Your Gateway to Academic Excellence
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-gray-400 mb-12 font-mono"
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
              <SearchBar />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section - Reduced bottom padding from pb-20 to pb-4 */}
        <section className="container mx-auto px-4 pt-4 pb-4 relative">
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
                <div className="py-2 px-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white font-mono font-bold uppercase tracking-wider">
                  Our Impact
                </div>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="text-4xl md:text-5xl font-bold mb-3 neo-heading bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                The Numbers Speak
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.7 }}
                className="text-gray-400 max-w-xl mx-auto font-mono"
              >
                Growing consistently with the academic needs of VIT-AP students
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { icon: BookOpen, label: "Syllabi", value: "500+", color: "from-cyan-400 to-blue-500" },
                { icon: Users, label: "Students", value: "10K+", color: "from-purple-400 to-pink-500" },
                { icon: Download, label: "Downloads", value: "50K+", color: "from-emerald-400 to-teal-500" },
                { icon: Star, label: "Rating", value: "4.9", color: "from-yellow-400 to-orange-500" }
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
                    <div className="relative p-6 backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-white/10 rounded-3xl text-center hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] transition-all duration-300 h-full flex flex-col justify-center">
                      {/* Icon container */}
                      <div className={`relative mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} border border-white/20`}>
                          <stat.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Value */}
                      <div className="text-3xl font-bold mb-1 flex items-center justify-center neo-heading text-white">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.0 + index * 0.15, duration: 0.5 }}
                        >
                          {stat.value}
                        </motion.span>
                      </div>
                      
                      {/* Label */}
                      <div className="text-sm font-medium font-mono uppercase tracking-wider text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section - Reduced top padding from py-20 to pt-4 pb-20 */}
        <section className="container mx-auto px-4 pt-4 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="relative z-10"
          >
            {/* Section Header */}
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="mb-6 inline-block"
              >
                <div className="py-3 px-8 backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl text-white font-mono font-bold uppercase tracking-wider">
                  ✨ Platform Features
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7 }}
                className="text-5xl md:text-6xl font-bold mb-6 neo-heading"
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Why Choose 
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Study Hub?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-mono"
              >
                Experience the future of academic resources with our cutting-edge platform designed for modern students
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {[
                {
                  title: "Smart Search",
                  description: "Find exactly what you need with our AI-powered search engine that understands context and delivers precise results",
                  icon: Search,
                  color: "from-purple-400 to-pink-500",
                  delay: 2.0
                },
                {
                  title: "Real-time Updates",
                  description: "Get notified instantly when new materials are uploaded with our lightning-fast notification system",
                  icon: Zap,
                  color: "from-cyan-400 to-blue-500",
                  delay: 2.2
                },
                {
                  title: "Community Driven",
                  description: "Built by students, for students with collaborative features that bring the academic community together",
                  icon: Heart,
                  color: "from-emerald-400 to-teal-500",
                  delay: 2.4
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: feature.delay, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative perspective-1000"
                >
                  {/* Main Card */}
                  <div className="relative h-full">
                    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] transition-all duration-300">
                      {/* Icon Container */}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                        className="relative mb-8 self-start"
                      >
                        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} border border-white/20`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <motion.h3 
                          className="text-2xl font-bold mb-4 neo-heading text-white"
                        >
                          {feature.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-400 leading-relaxed flex-1 font-mono"
                        >
                          {feature.description}
                        </motion.p>
                        
                        {/* CTA */}
                        <motion.div 
                          className="flex items-center text-purple-400 mt-6 group/cta cursor-pointer font-mono font-bold uppercase tracking-wider"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm mr-2">Explore Feature</span>
                          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-center mt-24 perspective-1000"
            >
              <div className="relative p-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.8,
                      delay: 3.0,
                      ease: "easeOut" 
                    } 
                  }}
                  className="relative"
                >
                  <div className="mb-2 text-sm font-medium tracking-wider text-gray-400 uppercase font-mono">
                    <Sparkles className="inline-block w-4 h-4 mr-2 text-purple-400" />
                    Empowering Students
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 neo-heading">
                    <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-neo-pulse">
                      Elevate
                    </span>{" "}
                    <span className="text-white">Your</span>{" "}
                    <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-neo-pulse">
                      Academic
                    </span>{" "}
                    <span className="text-white">Journey</span>
                  </h3>
                  
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 3.2, duration: 1.2, ease: "easeInOut" }}
                    className="h-1 max-w-lg mx-auto bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-8"
                  />
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.4, duration: 0.8 }}
                    className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-mono"
                  >
                    Where knowledge meets innovation and student success becomes inevitable
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}