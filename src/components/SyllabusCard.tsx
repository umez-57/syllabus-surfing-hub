
import React, { useState } from "react";
import { Eye, Share2, X, FileText, Calendar, User, GraduationCap, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

export interface SyllabusCardProps {
  id: string;
  title: string;
  code: string;
  description: string;
  credits: number;
  filePath: string;
  fileName: string;
  highlight?: boolean;
}

export function SyllabusCard({
  id,
  title,
  code,
  description,
  credits,
  filePath,
  fileName,
  highlight = false,
}: SyllabusCardProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingView, setLoadingView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleView = async () => {
    if (!filePath) {
      toast.error("File path is missing.");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to view syllabus.");
      navigate("/login");
      return;
    }

    setLoadingView(true);
    try {
      const { data, error } = await supabase.storage
        .from("syllabi")
        .download(filePath.startsWith("files/") ? filePath : `files/${filePath}`);
      
      if (error) throw error;
      setPdfUrl(URL.createObjectURL(data));
    } catch {
      toast.error("Failed to load file.");
    } finally {
      setLoadingView(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${location.origin}/home?shared=${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Couldn't copy link – please copy manually.");
    }
  };

  return (
    <>
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
                    {code}
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
                  <span className="font-medium">{credits} Credits</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Recent</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <FileText className="w-4 h-4 text-pink-400" />
                  <span>PDF Format</span>
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
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={handleView}
                disabled={loadingView}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  flex-1 flex items-center justify-center gap-3
                  px-6 py-4
                  text-sm font-semibold
                  bg-gradient-to-r from-purple-500 to-cyan-500
                  hover:from-purple-600 hover:to-cyan-600
                  text-white rounded-2xl
                  transition-all duration-300
                  hover:shadow-lg hover:shadow-purple-500/25
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group/btn relative overflow-hidden
                "
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-center gap-3">
                  {loadingView ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    <>
                      <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      <span className="hidden sm:inline">View Syllabus</span>
                      <span className="sm:hidden">View</span>
                    </>
                  )}
                </div>
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="
                  flex items-center justify-center gap-2
                  px-6 py-4 sm:px-4
                  text-sm font-semibold
                  border border-white/20
                  hover:border-white/40
                  text-white rounded-2xl
                  backdrop-blur-xl
                  transition-all duration-300
                  hover:bg-white/10
                  group/share relative overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover/share:opacity-100 transition-opacity duration-300" />
                <Share2 className="w-5 h-5 group-hover/share:scale-110 transition-transform relative z-10" />
                <span className="sm:hidden relative z-10">Share</span>
              </motion.button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-60" />
        </div>
      </motion.div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-7xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
            <motion.button
              onClick={() => {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 p-4 bg-black/90 hover:bg-black text-white rounded-2xl flex items-center gap-3 transition-all duration-300 backdrop-blur-xl border border-white/10"
            >
              <X className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Close</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
