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
    <footer className="bg-black text-white py-4 mt-auto border-t border-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} VIT AP Study Hub , All rights reserved.
        </div>

        <div className="flex space-x-4">
          <TooltipProvider>
            {/* Privacy Policy */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/privacy-policy")}
                >
                  <ShieldCheck className="mr-2" />
                  Privacy Policy
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
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/terms-of-service")}
                >
                  <FileText className="mr-2" />
                  Terms of Service
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View our Terms of Service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  )
}
