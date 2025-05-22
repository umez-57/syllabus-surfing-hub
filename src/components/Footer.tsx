import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText } from "lucide-react"

export const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="relative mt-auto border-t border-white/10">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} VIT AP Study Hub , All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <TooltipProvider>
              {/* Privacy Policy */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/privacy-policy")}
                    className="
                      relative overflow-hidden
                      text-white bg-white/5 hover:bg-white/10
                      border border-white/10 hover:border-white/20
                      backdrop-blur-lg
                      transition-all duration-300
                      group
                    "
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <ShieldCheck className="mr-2 h-4 w-4 text-white/70 group-hover:text-white/90" />
                    <span className="relative z-10">Privacy Policy</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View our Privacy Policy</p>
                </TooltipContent>
              </Tooltip>

              {/* Terms of Service */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/terms-of-service")}
                    className="
                      relative overflow-hidden
                      text-white bg-white/5 hover:bg-white/10
                      border border-white/10 hover:border-white/20
                      backdrop-blur-lg
                      transition-all duration-300
                      group
                    "
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <FileText className="mr-2 h-4 w-4 text-white/70 group-hover:text-white/90" />
                    <span className="relative z-10">Terms of Service</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View our Terms of Service</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  )
}