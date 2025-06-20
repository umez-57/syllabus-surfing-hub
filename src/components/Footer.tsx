import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText, Heart, Github, Twitter, Mail, ExternalLink, MessageSquare } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { FeedbackForm } from "@/components/ui/FeedbackForm"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "@/hooks/use-toast"

export const Footer = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [showFeedbackButton, setShowFeedbackButton] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Add scroll event listener to show button only when near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const bottomThreshold = document.documentElement.scrollHeight - 500
      setShowFeedbackButton(scrollPosition > bottomThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFeedbackClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit feedback.",
        variant: "destructive",
      })
      navigate("/login")
      return
    }
    setIsFeedbackOpen(true)
  }

  const handleGitHubClick = () => {
    toast({
      title: "🔒 Confidential Information",
      description: "Our GitHub repository contains confidential information and cannot be shared publicly. Please use the mail option to reach out to us. Thank you for understanding!",
      duration: 5000,
    })
  }

  const handleTwitterClick = () => {
    toast({
      title: "🔒 Confidential Information", 
      description: "Our social media accounts contain confidential information and cannot be revealed publicly. Please use the mail option to reach out to us. Thank you for understanding!",
      duration: 5000,
    })
  }

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Home", action: () => navigate("/home") },
        { label: "Notes", action: () => navigate("/notes") },
        { label: "PYQ", action: () => navigate("/pyq") },
        { label: "Timetable Scheduler", action: () => window.open("https://timetable.vitaphub.in/", "_blank") }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Timetable Schedule Guide", action: () => navigate("/guide") },
        { 
          label: "Feedback", 
          action: handleFeedbackClick,
          requiresAuth: true
        }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", action: () => navigate("/privacy-policy") },
        { label: "Terms of Service", action: () => navigate("/terms-of-service") }
      ]
    }
  ]

  const socialLinks = [
    { 
      icon: Github, 
      label: "GitHub", 
      action: handleGitHubClick,
      tooltip: "Repository (Confidential)"
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      action: handleTwitterClick,
      tooltip: "Social Media (Confidential)"
    },
    { 
      icon: Mail, 
      label: "Email", 
      action: handleFeedbackClick,
      tooltip: "Contact Us"
    }
  ]

  return (
    <footer className="relative mt-12 neo-border-thin border-b-0 border-l-0 border-r-0 monster-gray overflow-hidden">
      {/* Geometric shapes for Neo-Brutalism */}
      <div className="absolute top-10 left-10 neo-triangle floating-shape opacity-10" />
      <div className="absolute top-20 right-20 neo-circle floating-shape opacity-10" />
      <div className="absolute bottom-10 left-1/4 neo-square floating-shape opacity-10" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
          {/* Brand Section */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  {/* Blackish glassy background container */}
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/60 border border-white/20 rounded-lg shadow-lg"></div>
                  <img 
                    src="/favicon.ico" 
                    alt="VIT Logo" 
                    className="relative h-12 w-auto p-3 z-10" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-monster-green neo-heading">VIT AP Study Hub</h3>
                  <p className="text-sm text-monster-silver font-mono">Academic Excellence Platform</p>
                </div>
              </div>
              
              <p className="text-monster-silver mb-4 max-w-md text-sm font-mono leading-relaxed">
                Empowering VIT-AP students with seamless access to academic resources, 
                fostering collaborative learning and academic success.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.label}
                    onClick={social.action}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 neo-border-thin monster-gray text-monster-green hover:monster-accent hover:text-monster-white transition-all duration-300"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <social.icon className="w-4 h-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="monster-gray text-monster-green neo-border">
                          <p className="font-mono">{social.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-monster-green font-bold mb-3 text-sm neo-heading">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05), duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={link.action}
                        className={`text-monster-silver hover:text-monster-green transition-colors duration-300 text-xs flex items-center gap-1 group font-mono ${
                          link.requiresAuth && !isAuthenticated ? 'opacity-50' : ''
                        }`}
                      >
                        {link.label}
                        {link.requiresAuth && !isAuthenticated && (
                          <span className="text-xs text-monster-accent ml-1">(Login Required)</span>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Feedback Button (Fixed position) - Only show if authenticated */}
        <AnimatePresence>
          {showFeedbackButton && isAuthenticated && (
            <motion.div 
              className="fixed right-6 bottom-6 z-50"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleFeedbackClick} 
                      variant="accent"
                      className="group flex items-center gap-2 px-4 py-2 h-12 font-mono font-bold uppercase tracking-wider"
                      size="default"
                    >
                      <MessageSquare className="h-4 w-4 animate-neo-pulse" />
                      <span className="text-sm">Feedback</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="monster-gray text-monster-green neo-border">
                    <p className="font-mono">Share your thoughts with us!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-4 neo-border-thin border-b-0 border-l-0 border-r-0 border-t-monster-silver"
        >
          <div className="flex justify-center items-center">
            {/* Copyright */}
            <div className="flex items-center gap-1 text-xs text-monster-silver flex-wrap justify-center font-mono">
              <span>© {new Date().getFullYear()} VIT AP Study Hub. All rights reserved.</span>
              <span className="mx-1">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-monster-accent" /> for students
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feedback Dialog */}
      <FeedbackForm isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </footer>
  )
}