
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
        <div 
          className="flex items-center justify-center gap-6 mb-6 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/home")}
        >
          <img
            src="/vit.png"
            alt="VIT Logo"
            className="h-24 md:h-28 lg:h-32 w-auto object-cover"
          />
          <div>
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent leading-none">
              VIT AP
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white/90 mt-2 leading-none">
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
