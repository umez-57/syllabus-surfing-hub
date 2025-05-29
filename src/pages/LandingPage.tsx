
import React from "react";
import { useNavigate } from "react-router-dom";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { MobileHeroGeometric } from "@/components/ui/mobile-shape-landing-hero";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceMonitor } from "@/utils/performance";

export default function LandingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { optimizationSettings } = usePerformanceMonitor();

  // Use mobile-optimized component on mobile devices or low-performance devices
  const shouldUseMobileVersion = isMobile || optimizationSettings.useLightweightComponents;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {shouldUseMobileVersion ? (
        <MobileHeroGeometric
          badge="UMEZ UI"
          title1="VIT AP"
          title2="Study Hub"
        />
      ) : (
        <HeroGeometric
          badge="UMEZ UI"
          title1="VIT AP"
          title2="Study Hub"
        />
      )}
    </div>
  );
}
