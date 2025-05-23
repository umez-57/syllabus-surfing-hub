
import React from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText, Heart, Github, Twitter, Mail, ExternalLink } from "lucide-react"
import { BeamsBackground } from "@/components/ui/beams-background"

export const Footer = () => {
  const navigate = useNavigate()

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Home", action: () => navigate("/home") },
        { label: "Notes", action: () => navigate("/notes") },
        { label: "PYQ", action: () => navigate("/pyq") },
        { label: "Timetable", action: () => window.open("https://timetable.vitaphub.in/", "_blank") }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Study Guide", action: () => navigate("/guide") },
        { label: "Help Center", action: () => {} },
        { label: "API Docs", action: () => {} },
        { label: "Feedback", action: () => {} }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", action: () => navigate("/privacy-policy") },
        { label: "Terms of Service", action: () => navigate("/terms-of-service") },
        { label: "Cookie Policy", action: () => {} },
        { label: "DMCA", action: () => {} }
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Mail, label: "Email", url: "mailto:hello@vitaphub.in" }
  ]

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0">
        <BeamsBackground intensity="subtle" className="h-full w-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img src="/vit.png" alt="VIT Logo" className="h-10 w-auto" />
                <div>
                  <h3 className="text-xl font-bold text-white">VIT AP Study Hub</h3>
                  <p className="text-sm text-white/60">Academic Excellence Platform</p>
                </div>
              </div>
              
              <p className="text-white/70 mb-6 max-w-md">
                Empowering VIT-AP students with seamless access to academic resources, 
                fostering collaborative learning and academic success.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <social.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
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
                        className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>© {new Date().getFullYear()} VIT AP Study Hub. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-400" /> for students
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/privacy-policy")}
                      className="text-white/70 hover:text-white hover:bg-white/5 rounded-lg border border-white/10"
                    >
                      <ShieldCheck className="mr-2 h-3 w-3" />
                      Privacy
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View our Privacy Policy</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/terms-of-service")}
                      className="text-white/70 hover:text-white hover:bg-white/5 rounded-lg border border-white/10"
                    >
                      <FileText className="mr-2 h-3 w-3" />
                      Terms
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View our Terms of Service</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
