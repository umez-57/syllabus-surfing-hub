
import React from "react"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star, ArrowRight, Sparkles } from "lucide-react"

export default function Index() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background with Floating Orbs */}
      <div className="absolute inset-0">
        {/* Gradient Background - Darker theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/10 via-transparent to-transparent" />
        
        {/* Floating Orbs - More subtle */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl animate-pulse delay-2000" />
        
        {/* Animated Grid - More subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 animate-pulse" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
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

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {[
              { icon: BookOpen, label: "Syllabi", value: "500+", color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "Students", value: "10K+", color: "from-purple-500 to-pink-500" },
              { icon: Download, label: "Downloads", value: "50K+", color: "from-green-500 to-emerald-500" },
              { icon: Star, label: "Rating", value: "4.9", color: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl" />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-center hover:border-white/20 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
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
    </div>
  )
}
