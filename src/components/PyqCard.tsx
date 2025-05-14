import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Eye, Share2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrivePyq } from "@/integrations/google";

/* ─── props ──────────────────────────────────────────────── */
export interface PyqCardProps {
  id: string;
  title: string;
  department_id: string;
  course_code: string;
  highlight?: boolean;
}

/* ─── component ──────────────────────────────────────────── */
export function PyqCard({
  id,
  title,
  department_id,
  course_code,
  highlight = false,
}: PyqCardProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ----- VIEW (login required) -------------------------------- */
  const handleView = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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

  /* ----- SHARE ------------------------------------------------ */
  const handleShare = async () => {
    const url = `${location.origin}/pyq?dept=${department_id}&shared=${id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Couldn’t copy link – please copy manually.");
    }
  };

  /* ----- JSX -------------------------------------------------- */
  return (
    <Wrapper $highlight={highlight} id={`card-${id}`}>
      <div className="brutalist-card">
        {/* header */}
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="brutalist-card__alert">
            {title || "Untitled PYQ"}
          </div>
        </div>

        {/* body */}
        <div className="brutalist-card__message">
          <strong>Course Code:</strong> {course_code || "N/A"}
        </div>

        {/* actions */}
        <div className="brutalist-card__actions">
          <a
            className="brutalist-card__button brutalist-card__button--mark"
            onClick={handleView}
          >
            {loading ? (
              <ClipLoader size={16} color="#000" />
            ) : (
              <>
                <Eye className="mr-2" />View
              </>
            )}
          </a>
          <a
            className="brutalist-card__button brutalist-card__button--read"
            onClick={handleShare}
          >
            <Share2 className="mr-2" />Share
          </a>
        </div>
      </div>
    </Wrapper>
  );
}

/* ─── styles (brutalist + glow) ──────────────────────────── */
const glow = keyframes`
  0%   { box-shadow:0 0 0 4px #ffe600,0 0 15px 8px #ffd000; }
  100% { box-shadow:5px 5px 0 #000; }
`;

const Wrapper = styled.div<{ $highlight?: boolean }>`
  .brutalist-card {
    width:320px;
    min-height:200px;
    border:4px solid #000;
    background:#fff;
    padding:1.5rem;
    box-shadow:5px 5px 0 #fff;
    font-family:"Arial",sans-serif;

    ${({ $highlight }) =>
      $highlight &&
      css`
        animation:${glow} 10s ease-out forwards;
      `}
  }

  .brutalist-card__header {
    display:flex;
    align-items:center;
    gap:1rem;
    margin-bottom:1rem;
    border-bottom:2px solid #000;
    padding-bottom:1rem;
  }
  .brutalist-card__icon {
    display:flex;
    align-items:center;
    justify-content:center;
    background:#000;
    padding:0.5rem;
  }
  .brutalist-card__icon svg { width:1.5rem;height:1.5rem;fill:#fff; }
  .brutalist-card__alert {
    font-weight:900;
    color:#000;
    font-size:0.8rem;
    text-transform:uppercase;
  }

  .brutalist-card__message {
    margin-top:1rem;
    color:#000;
    font-size:0.9rem;
    line-height:1.4;
    border-bottom:2px solid #000;
    padding-bottom:1rem;
    font-weight:600;
  }

  .brutalist-card__actions { margin-top:1rem; }

  .brutalist-card__button {
    display:block;
    width:100%;
    padding:0.75rem;
    text-align:center;
    font-size:1rem;
    font-weight:700;
    text-transform:uppercase;
    border:3px solid #000;
    background:#fff;
    color:#000;
    position:relative;
    transition:.2s;
    box-shadow:5px 5px 0 #000;
    margin-bottom:1rem;
    cursor:pointer;
    overflow:hidden;
  }
  .brutalist-card__button--read { background:#000;color:#fff; }
  .brutalist-card__button::before {
    content:"";
    position:absolute;
    inset:0;
    left:-100%;
    background:linear-gradient(120deg,transparent,rgba(255,255,255,.3),transparent);
    transition:.6s;
  }
  .brutalist-card__button:hover::before { left:100%; }
  .brutalist-card__button:hover { transform:translate(-2px,-2px); box-shadow:7px 7px 0 #000; }
  .brutalist-card__button--mark:hover {
    background:#296fbb;
    border-color:#296fbb;
    color:#fff;
    box-shadow:7px 7px 0 #004280;
  }
  .brutalist-card__button--read:hover {
    background:#ff0000;
    border-color:#ff0000;
    color:#fff;
    box-shadow:7px 7px 0 #800000;
  }
  .brutalist-card__button:active { transform:translate(5px,5px); box-shadow:none; }
`;
