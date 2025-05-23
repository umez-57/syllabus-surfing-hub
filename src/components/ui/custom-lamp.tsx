
"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomLamp = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className="relative flex items-center justify-center">
        {/* Left lamp beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          animate={{ opacity: 1, width: "12rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute right-1/2 h-24 w-48 bg-gradient-conic from-purple-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-gradient-to-t from-black/80 to-transparent h-20 bottom-0 z-20" />
          <div className="absolute w-20 h-full left-0 bg-gradient-to-r from-black/80 to-transparent bottom-0 z-20" />
        </motion.div>

        {/* Right lamp beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          animate={{ opacity: 1, width: "12rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute left-1/2 h-24 w-48 bg-gradient-conic from-transparent via-transparent to-purple-500 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-20 h-full right-0 bg-gradient-to-l from-black/80 to-transparent bottom-0 z-20" />
          <div className="absolute w-full right-0 bg-gradient-to-t from-black/80 to-transparent h-20 bottom-0 z-20" />
        </motion.div>

        {/* Central glow */}
        <div className="absolute h-16 w-32 rounded-full bg-purple-500 opacity-30 blur-2xl"></div>
        
        {/* Lamp bar */}
        <motion.div
          initial={{ width: "6rem" }}
          animate={{ width: "10rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute h-0.5 w-40 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 shadow-lg shadow-purple-500/50"
        ></motion.div>

        {/* Lamp housing */}
        <div className="absolute w-2 h-8 bg-gradient-to-b from-gray-300 to-gray-600 rounded-sm -translate-y-4"></div>
      </div>
    </div>
  );
};
