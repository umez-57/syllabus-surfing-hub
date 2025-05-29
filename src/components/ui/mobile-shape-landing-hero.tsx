
"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useIsMobile } from "@/hooks/use-mobile";

function SimpleShape({
  className,
  delay = 0,
  width = 200,
  height = 60,
  gradient = "from-white/[0.05]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={cn("absolute", className)}
    >
      <div
        style={{ width, height }}
        className={cn(
          "rounded-full bg-gradient-to-r to-transparent",
          gradient,
          "border border-white/[0.1]",
          "shadow-lg"
        )}
      />
    </motion.div>
  );
}

function MobileHeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3 + i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]" />

      {/* Reduced floating shapes for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <SimpleShape
          delay={0.3}
          width={isMobile ? 200 : 300}
          height={isMobile ? 40 : 60}
          gradient="from-indigo-500/[0.08]"
          className="left-[-10%] top-[20%]"
        />
        <SimpleShape
          delay={0.5}
          width={isMobile ? 150 : 250}
          height={isMobile ? 30 : 50}
          gradient="from-rose-500/[0.08]"
          className="right-[-5%] top-[70%]"
        />
        <SimpleShape
          delay={0.4}
          width={isMobile ? 100 : 150}
          height={isMobile ? 25 : 35}
          gradient="from-violet-500/[0.08]"
          className="left-[10%] bottom-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Simplify your academic journey with a one-stop solution for Syllabus,
              Notes, Timetable Scheduler, and more
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={cn(
              "flex justify-center items-center gap-4 mb-8",
              isMobile ? "flex-col" : "flex-row"
            )}>
              <ShimmerButton
                className="px-6 py-3 text-base md:text-lg"
                onClick={() => navigate("/home")}
              >
                Dive into Study Hub
              </ShimmerButton>

              <ShimmerButton
                className="px-6 py-3 text-base md:text-lg"
                onClick={() =>
                  window.open("https://timetable.vitaphub.in/")
                }
              >
                Timetable Scheduler
              </ShimmerButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { MobileHeroGeometric };
