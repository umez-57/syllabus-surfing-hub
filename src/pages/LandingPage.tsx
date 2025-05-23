import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ShimmerButton } from "@/components/ui/shimmer-button"; 
// ^ Adjust path if the file is actually in a different folder

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <HeroGeometric
        badge="UMEZ UI"
        title1="VIT AP"
        title2="Study Hub"
      />

    </div>
  );
}
