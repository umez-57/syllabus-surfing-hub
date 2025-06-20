import React, { useState } from "react";
import { Eye, Share2, FileText, Calendar, User, GraduationCap, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrive } from "@/integrations/google";
import { motion } from "framer-motion";

export interface NotesCardProps {
  id: string;
  title: string;
  description: string;
  department_id: string;
  course_code: string;
  notes_by: string;
  highlight?: boolean;
}

export function NotesCard({
  id,
  title,
  description,
  department_id,
  course_code,
  notes_by,
  highlight = false,
}: NotesCardProps) {
  const [loadingView, setLoadingView] = useState(false);
  const navigate = useNavigate();

  const handleView = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to view notes.");
      navigate("/login");
      return;
    }

    setLoadingView(true);
    try {
      const link = await fetchFileFromDrive(course_code, notes_by);
      if (link) {
        window.open(link, "_blank");
        toast.success("Opening Google Drive file…");
      } else {
        toast.error("No file link found for this note.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch file.");
    } finally {
      setLoadingView(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${location.origin}/notes?dept=${department_id}&shared=${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
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
      {/* Main Card Container - Increased height from 420px/440px to 480px/500px */}
      <div 
        className={`
          relative overflow-hidden
          h-[480px] sm:h-[500px]
          rounded-3xl
          border border-white/10
          neo-border neo-shadow
          transition-all duration-300
          hover:translate-x-2 hover:translate-y-2 hover:shadow-[6px_6px_0px_#000]
          ${highlight ? 'bg-white/5 backdrop-blur-xl text-white border-purple-400/30' : 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl text-white'}
        `}
      >
        {/* Content with fixed spacing structure */}
        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
          {/* Header Section - Fixed height */}
          <div className="flex items-start justify-between mb-6 min-h-[80px]">
            <div className="flex-1">
              {/* Course Code Badge */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <div className="p-2.5 neo-border-thin monster-cyan">
                  <GraduationCap className="w-5 h-5 text-monster-black" />
                </div>
                <span className="text-sm font-bold neo-heading">
                  {course_code}
                </span>
              </motion.div>

              {/* Title - Fixed height container to prevent layout shift */}
              <div className="h-[60px] flex items-start">
                <h3 className="text-lg sm:text-xl font-bold line-clamp-2 leading-tight neo-heading">
                  {title}
                </h3>
              </div>
            </div>
            
            {/* Status Indicator */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 monster-emerald neo-border-thin flex-shrink-0"
            />
          </div>

          {/* Description Section - Fixed height */}
          <div className="flex-grow mb-8 min-h-[180px] flex flex-col">
            {/* Description text - Fixed height */}
            <div className="h-[72px] mb-6">
              <p className="text-sm sm:text-base line-clamp-3 leading-relaxed font-mono">
                {description}
              </p>
            </div>
            
            {/* Meta Information Grid - Fixed height */}
            <div className="grid grid-cols-2 gap-4 mb-4 h-[60px]">
              <div className="flex items-center gap-2 text-xs">
                <User className="w-4 h-4 text-monster-purple flex-shrink-0" />
                <span className="font-medium font-mono truncate">{notes_by}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-4 h-4 text-monster-cyan flex-shrink-0" />
                <span className="font-mono">Recent</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-monster-accent flex-shrink-0" />
                <span className="font-mono">Drive Link</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-monster-emerald flex-shrink-0" />
                <span className="font-mono">Updated</span>
              </div>
            </div>

            {/* Progress Bar - Fixed height */}
            <div className="w-full h-2 monster-gray neo-border-thin overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="h-full monster-green"
              />
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex flex-row gap-3 mt-auto">
            <motion.button
              onClick={handleView}
              disabled={loadingView}
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
                min-h-[56px]
              "
            >
              <div className="relative z-10 flex items-center gap-2">
                {loadingView ? (
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
                min-h-[56px]
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