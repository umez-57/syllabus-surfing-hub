import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star, ArrowRight, Sparkles, Search, Zap, Heart } from "lucide-react"
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

        {/* Features Section - Completely Revamped */}
        <section className="container mx-auto px-4 py-20 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-500"></div>
          </div>

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
                <div className="py-2 px-6 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/20 backdrop-blur-xl text-sm font-medium text-white/90 shadow-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                    ✨ Platform Features
                  </span>
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
              >
                Why Choose 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  Study Hub?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.7 }}
                className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed"
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
                  gradient: "from-purple-500 via-violet-500 to-purple-600",
                  bgGradient: "from-purple-500/20 to-pink-500/20",
                  delay: 2.0
                },
                {
                  title: "Real-time Updates",
                  description: "Get notified instantly when new materials are uploaded with our lightning-fast notification system",
                  icon: Zap,
                  gradient: "from-cyan-500 via-blue-500 to-cyan-600",
                  bgGradient: "from-cyan-500/20 to-blue-500/20",
                  delay: 2.2
                },
                {
                  title: "Community Driven",
                  description: "Built by students, for students with collaborative features that bring the academic community together",
                  icon: Heart,
                  gradient: "from-green-500 via-emerald-500 to-green-600",
                  bgGradient: "from-green-500/20 to-emerald-500/20",
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
                  {/* Card Background Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110`} />
                  
                  {/* Main Card */}
                  <div className="relative h-full">
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-[1px] group-hover:from-white/20 group-hover:via-white/10 group-hover:to-white/20 transition-all duration-500">
                      <div className="h-full w-full rounded-3xl bg-black/40 backdrop-blur-xl" />
                    </div>
                    
                    {/* Card Content */}
                    <div className="relative p-8 h-full flex flex-col">
                      {/* Icon Container */}
                      <motion.div 
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                        className="relative mb-8 self-start"
                      >
                        {/* Icon Background Glow */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-lg group-hover:opacity-40 group-hover:scale-125 transition-all duration-700`} />
                        
                        {/* Icon */}
                        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-2xl`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        {/* Floating Particles */}
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500 delay-100" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-200" />
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <motion.h3 
                          className="text-2xl font-bold text-white mb-4 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300"
                        >
                          {feature.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed flex-1"
                        >
                          {feature.description}
                        </motion.p>
                        
                        {/* CTA */}
                        <motion.div 
                          className="flex items-center text-white/80 hover:text-white transition-colors mt-6 group/cta cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-sm font-medium mr-2">Explore Feature</span>
                          <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform duration-200" />
                          <div className="ml-2 w-0 group-hover/cta:w-8 h-[1px] bg-gradient-to-r from-white/60 to-transparent transition-all duration-300" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Highlight Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-center mt-20"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Your Academic Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <SpeedInsights />
      <Footer />
    </BeamsBackground>
  )
}
