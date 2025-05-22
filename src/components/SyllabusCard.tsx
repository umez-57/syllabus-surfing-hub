import React, { useState } from "react";
import { Eye, Share2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

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
    <div className="relative group">
      <div 
        className={`
          relative overflow-hidden 
          min-h-[280px] sm:h-[320px]
          backdrop-blur-xl bg-black/30 rounded-2xl
          border border-white/20
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          transition-all duration-500 ease-out
          hover:translate-y-[-10px]
          hover:shadow-[0_20px_50px_0_rgba(255,255,255,0.15)]
          group-hover:border-white/40
          ${highlight ? 'ring-2 ring-white/20' : ''}
        `}
      >
        <div className="p-6 h-full flex flex-col relative z-10">
          <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 line-clamp-2 text-center">
            {title}
          </h3>
          
          <div className="border-t border-b border-white/10 py-4 flex-grow backdrop-blur-sm rounded-xl">
            <div className="sm:hidden text-center space-y-2">
              <p className="text-white/90 text-sm">
                <span className="font-semibold">Course Code:</span> {code}
              </p>
              <p className="text-white/90 text-sm">
                <span className="font-semibold">Credits:</span> {credits}
              </p>
            </div>
            
            <p className="hidden sm:block text-white/90 text-sm text-center mb-2">
              <span className="font-semibold">Course Code:</span> {code}
              <span className="mx-2">|</span>
              <span className="font-semibold">Credits:</span> {credits}
            </p>
            
            <p className="text-white/70 text-sm line-clamp-3 text-center px-2 mt-2">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleView}
              className={`
                flex items-center justify-center gap-2
                px-6 py-3 w-full
                text-sm font-semibold tracking-wider
                bg-gradient-to-r from-white/10 to-white/5
                hover:from-white/20 hover:to-white/10
                text-white rounded-xl
                backdrop-blur-lg
                transition-all duration-300
                border border-white/10
                hover:border-white/30
                hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)]
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              disabled={loadingView}
            >
              {loadingView ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  <span>VIEW</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className={`
                flex items-center justify-center gap-2
                px-6 py-3 w-full
                text-sm font-semibold tracking-wider
                bg-gradient-to-r from-purple-500/20 to-blue-500/20
                hover:from-purple-500/30 hover:to-blue-500/30
                text-white rounded-xl
                backdrop-blur-xl
                transition-all duration-500
                border border-white/20
                hover:border-white/40
                hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]
                active:scale-95
                group/share
                overflow-hidden
                relative
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-purple-500/10 before:to-blue-500/10
                before:translate-x-[-100%] before:blur-xl
                hover:before:translate-x-[100%]
                before:transition-transform before:duration-1000
              `}
            >
              <Share2 className="w-5 h-5 transition-transform duration-300 group-hover/share:scale-110" />
              <span className="relative z-10">SHARE</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl overflow-hidden">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
            <button
              onClick={() => {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }}
              className="absolute top-4 right-4 bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}