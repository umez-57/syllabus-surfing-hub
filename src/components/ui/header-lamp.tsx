
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const HeaderLamp = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("relative flex items-center justify-center overflow-visible", className)}>
      <div className="relative flex w-full flex-1 scale-y-100 items-center justify-center isolate z-0">
        {/* Left lamp beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.8, width: "25rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-40 overflow-visible w-[25rem] bg-gradient-conic from-cyan-400/60 via-purple-400/20 to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-transparent h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,transparent_20%,black_80%)]" />
          <div className="absolute w-32 h-[100%] left-0 bg-transparent bottom-0 z-20 [mask-image:linear-gradient(to_right,transparent_20%,black_80%)]" />
        </motion.div>

        {/* Right lamp beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.8, width: "25rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-40 w-[25rem] bg-gradient-conic from-transparent via-purple-400/20 to-cyan-400/60 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-32 h-[100%] right-0 bg-transparent bottom-0 z-20 [mask-image:linear-gradient(to_left,transparent_20%,black_80%)]" />
          <div className="absolute w-[100%] right-0 bg-transparent h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,transparent_20%,black_80%)]" />
        </motion.div>

        {/* Central glow effects - larger and more diffused */}
        <div className="absolute inset-auto z-50 h-24 w-[20rem] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-400/40 to-cyan-400/30 opacity-60 blur-3xl"></div>
        
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-24 w-48 -translate-y-[4rem] rounded-full bg-gradient-to-r from-cyan-300/50 via-purple-300/60 to-pink-300/50 blur-2xl"
        ></motion.div>

        {/* Lamp bar - glowing effect */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "25rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[25rem] -translate-y-[5rem] bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 shadow-2xl shadow-cyan-400/50 rounded-full"
        ></motion.div>

        {/* Additional diffused glow layers */}
        <div className="absolute inset-auto z-20 h-32 w-[30rem] -translate-y-[2rem] rounded-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-3xl"></div>
        <div className="absolute inset-auto z-10 h-40 w-[35rem] -translate-y-[1rem] rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-cyan-500/5 blur-3xl"></div>

        {/* Top mask - more transparent */}
        <div className="absolute inset-auto z-40 h-28 w-full -translate-y-[8rem] bg-gradient-to-b from-transparent via-transparent to-transparent"></div>
      </div>
    </div>
  );
};
