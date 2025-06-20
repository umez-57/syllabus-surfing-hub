import React from "react";
import { motion } from "framer-motion";

export const SyllabusCardSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
    >
      {/* Main Card Container */}
      <div className="
        relative overflow-hidden
        h-[420px] sm:h-[440px]
        rounded-3xl
        border border-white/10
        bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80
        backdrop-blur-xl
      ">
        {/* Skeleton Loader */}
        <div className="skeleton-loader w-full h-full" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-60" />
      </div>
    </motion.div>
  );
};