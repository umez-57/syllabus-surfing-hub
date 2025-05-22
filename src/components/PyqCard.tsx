import React, { useState } from "react";
import { Eye, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrivePyq } from "@/integrations/google";

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
            <p className="text-white/90 text-sm text-center mb-2">
              <span className="font-semibold">Course Code:</span> {course_code}
            </p>
            
            <p className="text-white/70 text-sm text-center px-2 mt-4">
              Access previous year question papers for this course
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
              disabled={loading}
            >
              {loading ? (
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
    </div>
  );
}