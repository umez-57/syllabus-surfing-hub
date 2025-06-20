import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen monster-dark text-monster-green flex flex-col items-center justify-center relative overflow-hidden">
      {/* Geometric shapes for Neo-Brutalism */}
      <div className="absolute top-20 left-20 neo-triangle floating-shape opacity-30" />
      <div className="absolute top-40 right-32 neo-circle floating-shape opacity-30" />
      <div className="absolute bottom-32 left-40 neo-square floating-shape opacity-30" />
      <div className="absolute bottom-20 right-20 neo-triangle floating-shape opacity-30" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 mb-8 neo-border monster-gray text-monster-green font-mono font-bold uppercase tracking-wider"
        >
          <span>Academic Excellence Platform</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 neo-heading neo-text-shadow"
        >
          VIT AP
          <span className="block text-monster-accent">
            STUDY HUB
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto font-mono"
        >
          Simplify your academic journey with a one-stop solution for Syllabus,
          Notes, Timetable Scheduler, and more
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-monster-silver mb-12 font-mono"
        >
          Where knowledge meets innovation
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center items-center gap-6 mb-8 flex-wrap"
        >
          <Button
            size="lg"
            onClick={() => navigate("/home")}
            className="text-lg px-8 py-4"
          >
            Dive into Study Hub
          </Button>

          <Button
            variant="cyan"
            size="lg"
            onClick={() => window.open("https://timetable.vitaphub.in/")}
            className="text-lg px-8 py-4"
          >
            Timetable Scheduler
          </Button>
        </motion.div>

        {/* Decorative line */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
          className="h-1 max-w-md mx-auto monster-green neo-border-thin mt-8"
        />
      </div>
    </div>
  );
}