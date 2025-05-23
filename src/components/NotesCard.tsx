
import React, { useState } from "react";
import { Eye, Share2, FileText, Calendar, User, GraduationCap, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrive } from "@/integrations/google";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

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
  const [isHovered, setIsHovered] = useState(false);
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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Main Card Container */}
      <div 
        className={`
          relative overflow-hidden
          h-[420px] sm:h-[440px]
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80
          backdrop-blur-xl
          transition-all duration-500 ease-out
          hover:border-white/20
          hover:shadow-2xl hover:shadow-purple-500/10
          hover:-translate-y-2
          ${highlight ? 'ring-2 ring-purple-400/50 shadow-lg shadow-purple-400/10' : ''}
        `}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Floating Geometric Elements */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Meteors Effect - Only on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <Meteors 
              number={15} 
              className="animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-purple-400/60 shadow-[0_0_0_1px_#a855f780] rotate-[215deg] before:bg-gradient-to-r before:from-[#a855f7] before:to-transparent"
            />
          </div>
        )}

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
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-white/90 uppercase tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {course_code}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white line-clamp-2 mb-4 leading-tight">
                {title}
              </h3>
            </div>
            
            {/* Status Indicator */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
            />
          </div>

          {/* Description */}
          <div className="flex-grow mb-8">
            <p className="text-white/70 text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed">
              {description}
            </p>
            
            {/* Meta Information Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <User className="w-4 h-4 text-purple-400" />
                <span className="font-medium">{notes_by}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recent</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Drive Link</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Calendar className="w-4 h-4 text-green-400" />
                <span>Updated</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-3">
            <motion.button
              onClick={handleView}
              disabled={loadingView}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex-1 flex items-center justify-center gap-2
                px-6 py-4
                text-sm font-semibold
                bg-indigo-600/20 backdrop-blur-xl
                border border-indigo-400/30
                hover:bg-indigo-600/30 hover:border-indigo-400/50
                text-white rounded-2xl
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                group/btn relative overflow-hidden
              "
            >
              <div className="relative z-10 flex items-center gap-2">
                {loadingView ? (
                  <ClipLoader size={18} color="#fff" />
                ) : (
                  <>
                    <Eye className="w-5 h-5 text-indigo-300 group-hover/btn:text-indigo-200 transition-colors duration-300" />
                    <span className="text-indigo-100 group-hover/btn:text-white transition-colors duration-300">View</span>
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
                text-sm font-semibold
                bg-teal-600/20 backdrop-blur-xl
                border border-teal-400/30
                hover:bg-teal-600/30 hover:border-teal-400/50
                text-white rounded-2xl
                transition-all duration-300
                group/share relative overflow-hidden
              "
            >
              <div className="relative z-10 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-300 group-hover/share:text-teal-200 transition-colors duration-300" />
                <span className="text-teal-100 group-hover/share:text-white transition-colors duration-300">Share</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-60" />
      </div>
    </motion.div>
  );
}
