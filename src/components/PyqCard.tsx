import React, { useState } from "react";
import { Eye, Share2, FileText, Calendar, User, GraduationCap, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrivePyq } from "@/integrations/google";
import { motion } from "framer-motion";

export interface PyqCardProps {
  id: string;
  title: string;
  department_id: string;
  course_code: string;
  highlight?: boolean;
}

export function PyqCard({
  id,
  title,
  department_id,
  course_code,
  highlight = false,
}: PyqCardProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleView = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to view question papers.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const link = await fetchFileFromDrivePyq(course_code);
      if (link) {
        window.open(link, "_blank");
        toast.success("Opening Google Drive file…");
      } else {
        toast.error("No pyq.zip found for this course.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch PYQ file.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = `${location.origin}/pyq?dept=${department_id}&shared=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Couldn't copy link – please copy manually.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative"
    >
      {/* Main Card Container */}
      <div 
        className={`
          relative overflow-hidden
          h-[420px] sm:h-[440px]
          rounded-3xl
          border border-white/10
          neo-border neo-shadow
          transition-all duration-300
          hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000]
          ${highlight ? 'bg-white/5 backdrop-blur-xl text-white highlight-card-glow' : 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl text-white'}
        `}
      >
        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* Course Code Badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div className="p-2.5 neo-border-thin monster-yellow">
                  <GraduationCap className="w-5 h-5 text-monster-black" />
                </div>
                <span className="text-sm font-bold neo-heading">
                  {course_code}
                </span>
              </motion.div>

              {/* Title - Reduced from text-xl sm:text-2xl to text-lg sm:text-xl */}
              <h3 className="text-lg sm:text-xl font-bold line-clamp-2 mb-4 leading-tight neo-heading">
                {title}
              </h3>
            </div>
            
            {/* Status Indicator */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 monster-emerald neo-border-thin"
            />
          </div>

          {/* Description */}
          <div className="flex-grow mb-8">
            <p className="text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed font-mono">
              Access previous year question papers for this course
            </p>
            
            {/* Meta Information Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs">
                <User className="w-4 h-4 text-monster-purple" />
                <span className="font-medium font-mono">PYQ Collection</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-monster-cyan" />
                <span className="font-mono">Recent</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-monster-accent" />
                <span className="font-mono">Drive Link</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-monster-emerald" />
                <span className="font-mono">Updated</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 monster-gray neo-border-thin overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="h-full monster-green"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3">
            <motion.button
              onClick={handleView}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex-1 flex items-center justify-center gap-2
                px-6 py-4
                text-sm font-bold
                monster-cyan text-monster-black
                neo-border neo-shadow-sm
                hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]
                transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
                font-mono uppercase tracking-wider
              "
            >
              <div className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <ClipLoader size={18} color="#000" />
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    <span>View</span>
                  </>
                )}
              </div>
            </motion.button>

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex-1 flex items-center justify-center gap-2
                px-6 py-4
                text-sm font-bold
                monster-accent text-monster-white
                neo-border neo-shadow-sm
                hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]
                transition-all duration-150
                font-mono uppercase tracking-wider
              "
            >
              <div className="relative z-10 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}