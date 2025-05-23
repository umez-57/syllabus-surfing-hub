
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ShimmerButton } from "@/components/ui/shimmer-button"; 
// ^ Adjust path if the file is actually in a different folder

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img
            src="/vit.png"
            alt="VIT Logo"
            className="h-16 w-auto object-cover"
          />
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              VIT AP
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white/90 mt-2">
              Study Hub
            </h2>
          </div>
        </div>
      </div>
      
      <HeroGeometric
        badge="UMEZ UI"
        title1=""
        title2=""
      />
    </div>
  );
}
