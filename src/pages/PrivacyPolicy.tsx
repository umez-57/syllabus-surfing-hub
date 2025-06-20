import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, Trash2, Mail, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: Shield,
      color: "from-purple-400 to-pink-500",
      content: (
        <div className="space-y-4">
          <p className="text-white/90 leading-relaxed font-mono">
            Welcome to <span className="text-monster-accent font-bold neo-heading">VIT AP Study Hub</span>.
            This Privacy Policy explains how we handle user data on our platform,
            including details about data protection, retention, and deletion.
          </p>
        </div>
      )
    },
    {
      id: "information",
      title: "Information We Collect",
      icon: Database,
      color: "from-cyan-400 to-blue-500",
      content: (
        <div className="space-y-6">
          <p className="text-white/90 leading-relaxed font-mono">
            Our website uses two types of authentication:
          </p>
          <div className="space-y-4">
            <div className="neo-card monster-gray text-monster-green p-6">
              <h4 className="text-lg font-bold mb-3 neo-heading flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Supabase Authentication
              </h4>
              <p className="font-mono text-sm leading-relaxed">
                Users sign up with email and OTP verification to access general website features. 
                We store a minimal profile (e.g., email, role) in our database.
              </p>
            </div>
            <div className="neo-card monster-purple text-monster-white p-6">
              <h4 className="text-lg font-bold mb-3 neo-heading flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Google Authentication (Calendar Only)
              </h4>
              <p className="font-mono text-sm leading-relaxed">
                Used exclusively for <span className="text-monster-yellow font-bold">creating a separate Google Calendar</span> containing 
                your class schedule at our timetable scheduling tool.
              </p>
              <a
                href="https://timetable.vitaphub.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-monster-cyan hover:text-monster-white transition-colors font-mono font-bold"
              >
                timetable.vitaphub.in <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: Eye,
      color: "from-emerald-400 to-teal-500",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              "We do not store your Google account details or other private information beyond the brief session needed to create your schedule in Google Calendar.",
              "Google authentication is only used to create calendar events in a separate calendar named \"WIN SEM\" (or similar).",
              "We do not share any user data with third parties."
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 neo-border monster-white">
                <div className="w-2 h-2 monster-emerald mt-2 flex-shrink-0" />
                <p className="text-monster-black font-mono text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "protection",
      title: "Data Protection & Security",
      icon: Shield,
      color: "from-yellow-400 to-orange-500",
      content: (
        <div className="space-y-6">
          <p className="text-white/90 leading-relaxed font-mono">
            We take reasonable measures to protect user data:
          </p>
          <div className="grid gap-4">
            {[
              {
                title: "HTTPS Encryption",
                desc: "All communication with Google Calendar APIs occurs over HTTPS, ensuring encryption in transit."
              },
              {
                title: "Limited Scope",
                desc: "We only request the Google Calendar scope to create or modify events in a dedicated calendar. We do not request or access other Google data."
              },
              {
                title: "Token Management",
                desc: "We do not store Google OAuth tokens permanently. After the schedule creation process completes, we remove or invalidate tokens."
              }
            ].map((item, index) => (
              <div key={index} className="neo-card monster-yellow text-monster-black p-6">
                <h4 className="font-bold mb-2 neo-heading">{item.title}</h4>
                <p className="font-mono text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "retention",
      title: "Data Retention & Deletion",
      icon: Trash2,
      color: "from-red-400 to-pink-500",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "Minimal Retention",
                desc: "We store your email and role (student/admin) in our database (Supabase) for account management.",
                color: "monster-cyan"
              },
              {
                title: "No Long-Term Google Data Storage",
                desc: "We do not store any Google Calendar events or tokens on our servers. Events are created in your Google Calendar, and we do not retain copies.",
                color: "monster-purple"
              },
              {
                title: "Session Expiration",
                desc: "After creating your schedule, we remove the short-lived session token to prevent ongoing access to your Google account.",
                color: "monster-emerald"
              },
              {
                title: "Deletion Requests",
                desc: "If you wish to delete your Supabase profile or any minimal data we hold, please contact us. We will promptly remove your data from our database.",
                color: "monster-accent"
              }
            ].map((item, index) => (
              <div key={index} className={`neo-card ${item.color} text-monster-black p-6`}>
                <h4 className="font-bold mb-2 neo-heading">{item.title}</h4>
                <p className="font-mono text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: Mail,
      color: "from-indigo-400 to-purple-500",
      content: (
        <div className="space-y-6">
          <p className="text-white/90 leading-relaxed font-mono">
            If you have any questions, requests for data deletion, or other concerns about this Privacy Policy, contact us:
          </p>
          <div className="neo-card monster-accent text-monster-white p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-4 neo-heading">Get in Touch</h4>
            <a
              href="mailto:info@vitaphub.in"
              className="inline-flex items-center gap-2 text-monster-white hover:text-monster-yellow transition-colors font-mono font-bold text-lg"
            >
              info@vitaphub.in
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      )
    }
  ];
  
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

      <Navbar />

      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 neo-border monster-gray text-monster-green font-mono font-bold uppercase tracking-wider"
            >
              <Shield className="w-4 h-4 text-monster-accent" />
              <span>Legal Documentation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 neo-heading neo-text-shadow"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-monster-silver max-w-3xl mx-auto font-mono"
            >
              Effective Date: <span className="text-monster-accent font-bold">20/05/2025</span>
            </motion.p>

            {/* Decorative line */}
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
              className="h-1 max-w-md mx-auto monster-green neo-border-thin mt-8"
            />
          </motion.div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 1 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
                className="group relative perspective-1000"
              >
                <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-white/10 rounded-3xl p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] transition-all duration-300">
                  {/* Section Header */}
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative flex-shrink-0"
                    >
                      <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${section.color} border border-white/20`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold neo-heading text-white">
                        {index + 1}. {section.title}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Section Content */}
                  <div className="ml-20">
                    {section.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex justify-center mt-16"
          >
            <Button
              onClick={() => navigate("/")}
              variant="accent"
              className="flex items-center gap-3 text-lg px-8 py-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;