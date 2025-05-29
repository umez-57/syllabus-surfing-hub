
import React from "react";
import { cn } from "@/lib/utils";

interface MobileHeroProps {
  className?: string;
  gradient?: boolean;
  blur?: boolean;
  children?: React.ReactNode;
}

export function MobileHero({ 
  className, 
  gradient = true, 
  blur = false, 
  children 
}: MobileHeroProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Simple gradient background - no blur for performance */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-blue-900/30" />
      )}
      
      {/* Optional simple animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200px] h-[200px] rounded-full bg-purple-500/10 top-[-100px] left-[-50px] animate-pulse" />
        <div className="absolute w-[150px] h-[150px] rounded-full bg-blue-500/10 bottom-[-75px] right-[-25px] animate-pulse" 
             style={{ animationDelay: '1s' }} />
      </div>
      
      {children}
    </div>
  );
}
