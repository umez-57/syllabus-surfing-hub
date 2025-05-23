
import React, { useState } from "react";
import { Eye, Share2, X, Download, FileText, Calendar, User } from "lucide-react";
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div 
        className={`
          relative overflow-hidden 
          h-[360px]
          rounded-3xl
          border border-white/10
          bg-gradient-to-br from-white/10 to-white/5
          backdrop-blur-xl
          transition-all duration-500 ease-out
          hover:border-white/20
          hover:shadow-2xl hover:shadow-purple-500/20
          hover:-translate-y-2
          ${highlight ? 'ring-2 ring-purple-400/50 shadow-lg shadow-purple-400/20' : ''}
        `}
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  {code}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
                {title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <div className="flex-grow mb-6">
            <p className="text-white/70 text-sm line-clamp-3 mb-4">
              {description}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-white/50">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{credits} Credits</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Updated recently</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleView}
              disabled={loadingView}
              className="
                flex-1 flex items-center justify-center gap-2
                px-4 py-3
                text-sm font-semibold
                bg-gradient-to-r from-purple-500 to-cyan-500
                hover:from-purple-600 hover:to-cyan-600
                text-white rounded-xl
                transition-all duration-300
                hover:shadow-lg hover:shadow-purple-500/25
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                group/btn
              "
            >
              {loadingView ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                <>
                  <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  <span>View</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="
                flex items-center justify-center gap-2
                px-4 py-3
                text-sm font-semibold
                border border-white/20
                hover:border-white/40
                text-white rounded-xl
                backdrop-blur-xl
                transition-all duration-300
                hover:bg-white/10
                active:scale-95
                group/share
              "
            >
              <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
            <button
              onClick={() => {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }}
              className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-black text-white rounded-xl flex items-center gap-2 transition-colors backdrop-blur-xl"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
