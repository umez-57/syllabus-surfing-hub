import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Users, Calendar, Shield, AlertTriangle, Trash2, Mail, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "agreement",
      title: "Agreement",
      icon: FileText,
      color: "from-purple-400 to-pink-500",
      content: (
        <div className="space-y-4">
          <p className="text-white/90 leading-relaxed font-mono">
            By using <span className="text-monster-accent font-bold neo-heading">VIT AP Study Hub</span> (the "Service"),
            you acknowledge that you have read, understood, and agree to be bound
            by these Terms of Service. If you do not agree, please do not use our
            platform.
          </p>
        </div>
      )
    },
    {
      id: "registration",
      title: "Account Registration",
      icon: Users,
      color: "from-cyan-400 to-blue-500",
      content: (
        <div className="space-y-6">
          <p className="text-white/90 leading-relaxed font-mono">
            Our website uses two types of authentication:
          </p>
          <div className="space-y-4">
            <div className="neo-card monster-cyan text-monster-black p-6">
              <h4 className="text-lg font-bold mb-3 neo-heading flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Supabase Authentication
              </h4>
              <p className="font-mono text-sm leading-relaxed">
                Users sign up with email and OTP verification to access general website features. 
                We store a minimal profile (e.g., email, role) in our database.
              </p>
            </div>
            <div className="neo-card monster-purple text-monster-white p-6">
              <h4 className="text-lg font-bold mb-3 neo-heading flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Google Authentication (Calendar Only)
              </h4>
              <p className="font-mono text-sm leading-relaxed">
                Used exclusively for creating a separate Google Calendar containing your 
                class schedule at our timetable scheduling tool.
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
      id: "calendar",
      title: "Use of Google Calendar Feature",
      icon: Calendar,
      color: "from-emerald-400 to-teal-500",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "Timetable Scheduler",
                desc: "Our timetable scheduler requires Google authentication to create events on your behalf.",
                link: "https://timetable.vitaphub.in/"
              },
              {
                title: "Minimum Permissions",
                desc: "We request the minimum necessary permissions from Google Calendar, solely to create or modify events in a dedicated calendar (e.g., \"WIN SEM\")."
              },
              {
                title: "No Data Storage",
                desc: "We do not store your Google account credentials or personal Google data. Once events are created, we remove or invalidate the short-lived token."
              },
              {
                title: "Revoke Anytime",
                desc: "You may revoke these permissions at any time via your Google Account settings."
              }
            ].map((point, index) => (
              <div key={index} className="neo-card monster-emerald text-monster-black p-6">
                <h4 className="font-bold mb-2 neo-heading">{point.title}</h4>
                <p className="font-mono text-sm leading-relaxed">{point.desc}</p>
                {point.link && (
                  <a
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-monster-purple hover:text-monster-black transition-colors font-mono font-bold"
                  >
                    Visit Tool <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "responsibilities",
      title: "User Responsibilities",
      icon: Shield,
      color: "from-yellow-400 to-orange-500",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {[
              "You are responsible for maintaining the security of your Google account and your account credentials for VIT AP Study Hub.",
              "You agree not to misuse the Service or use it for unlawful purposes.",
              "You are responsible for ensuring that any data you submit (e.g., timetable text, CSV uploads) does not violate the rights of others or contain malicious content."
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 neo-border monster-yellow">
                <div className="w-2 h-2 monster-black mt-2 flex-shrink-0" />
                <p className="text-monster-black font-mono text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Data Handling & Privacy",
      icon: Shield,
      color: "from-indigo-400 to-purple-500",
      content: (
        <div className="space-y-6">
          <div className="grid gap-4">
            {[
              {
                title: "Privacy Policy",
                desc: "Please review our Privacy Policy to understand how we collect, use, and protect your information.",
                action: "View Privacy Policy",
                link: "/privacy-policy"
              },
              {
                title: "Minimal Data Retention",
                desc: "We only retain minimal data (e.g., your email and role) in our Supabase database."
              },
              {
                title: "Google Calendar Control",
                desc: "Any data created in Google Calendar remains under your control; we do not store it on our servers."
              },
              {
                title: "Data Deletion",
                desc: "You may request deletion of your Supabase profile data at any time by contacting us."
              }
            ].map((item, index) => (
              <div key={index} className="neo-card monster-purple text-monster-white p-6">
                <h4 className="font-bold mb-2 neo-heading">{item.title}</h4>
                <p className="font-mono text-sm leading-relaxed mb-3">{item.desc}</p>
                {item.action && (
                  <button
                    onClick={() => navigate(item.link!)}
                    className="inline-flex items-center gap-2 text-monster-cyan hover:text-monster-white transition-colors font-mono font-bold"
                  >
                    {item.action} <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      color: "from-red-400 to-pink-500",
      content: (
        <div className="space-y-6">
          <div className="neo-card monster-red text-monster-black p-6">
            <h4 className="text-lg font-bold mb-4 neo-heading flex items-center gap-2 text-monster-black">
              <AlertTriangle className="w-5 h-5 text-monster-black" />
              Important Disclaimer
            </h4>
            <p className="font-mono text-sm leading-relaxed mb-4 text-monster-black">
              <span className="font-bold text-monster-black">VIT AP Study Hub</span> (the "Service") is provided on an "as-is" basis 
              without warranties of any kind, either express or implied.
            </p>
          </div>
          
          <p className="text-white/90 leading-relaxed font-mono mb-4">We are not responsible for:</p>
          
          <div className="grid gap-3">
            {[
              "Google Calendar errors, downtime, or revoked permissions.",
              "Any scheduling conflicts or missed classes due to incorrect data.",
              "Loss of access if you remove or revoke our permissions in Google.",
              "Direct, indirect, or incidental damages arising from the use of this Service."
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 neo-border monster-white">
                <div className="w-2 h-2 monster-red mt-2 flex-shrink-0" />
                <p className="text-monster-black font-mono text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "termination",
      title: "Termination",
      icon: Trash2,
      color: "from-gray-400 to-gray-600",
      content: (
        <div className="space-y-4">
          <p className="text-white/90 leading-relaxed font-mono">
            We reserve the right to suspend or terminate your account at any time
            if we believe you have violated these Terms. Upon termination, any
            access to Google Calendar scheduling will be revoked, and we may
            remove your profile data from our database.
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: Mail,
      color: "from-green-400 to-emerald-500",
      content: (
        <div className="space-y-6">
          <p className="text-white/90 leading-relaxed font-mono">
            If you have any questions or concerns regarding these Terms, please contact us:
          </p>
          <div className="neo-card monster-emerald text-monster-black p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-4 neo-heading">Get in Touch</h4>
            <a
              href="mailto:info@vitaphub.in"
              className="inline-flex items-center gap-2 text-monster-black hover:text-monster-purple transition-colors font-mono font-bold text-lg"
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
              <FileText className="w-4 h-4 text-monster-accent" />
              <span>Legal Agreement</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 neo-heading neo-text-shadow"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Terms of Service
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
                  delay: 1 + index * 0.15, 
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

export default TermsOfService;