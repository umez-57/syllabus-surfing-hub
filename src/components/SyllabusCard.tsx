// src/components/SyllabusCard.tsx
import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { Eye, Share2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

/* ─── props ───────────────────────────────────────────────── */
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

/* ─── component ───────────────────────────────────────────── */
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
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  /* fetch current user once */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  /* ----- VIEW (login required) -------------------------------- */
  const handleView = async () => {
    if (!filePath) {
      toast.error("File path is missing for viewing.");
      return;
    }

    /* ⛔ not logged in → redirect */
    const currentUser =
      user ?? (await supabase.auth.getUser()).data.user ?? null;
    if (!currentUser) {
      toast.error("Please sign in to view syllabus.");
      navigate("/login");
      return;
    }

    setLoadingView(true);
    try {
      const fullPath = filePath.startsWith("files/")
        ? filePath
        : `files/${filePath}`;
      const { data, error } = await supabase.storage
        .from("syllabi")
        .download(fullPath);
      if (error) throw error;

      setPdfUrl(URL.createObjectURL(data));
    } catch {
      toast.error("Failed to load file.");
    } finally {
      setLoadingView(false);
    }
  };

  /* ----- SHARE ------------------------------------------------ */
  const handleShare = async () => {
    const shareUrl = `${location.origin}/home?shared=${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
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
          <div className="brutalist-card__alert">{title}</div>
        </div>

        {/* body */}
        <div className="brutalist-card__message">
          <strong>Course Code:</strong> {code} | <strong>Credits:</strong>{" "}
          {credits}
          <br />
          {description}
        </div>

        {/* actions */}
        <div className="brutalist-card__actions">
          <a
            className="brutalist-card__button brutalist-card__button--mark"
            onClick={handleView}
          >
            {loadingView ? (
              <ClipLoader size={16} color="#000" />
            ) : (
              <>
                <Eye style={{ marginRight: 4 }} />
                View
              </>
            )}
          </a>
          <a
            className="brutalist-card__button brutalist-card__button--read"
            onClick={handleShare}
          >
            <Share2 style={{ marginRight: 4 }} />
            Share
          </a>
        </div>
      </div>

      {/* pdf modal */}
      {pdfUrl && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-3/4 bg-white rounded-lg shadow-lg">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfUrl} />
            </Worker>
            <button
              onClick={() => {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 px-3 py-1 flex items-center"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

/* ─── styles (unchanged) ──────────────────────────────────── */

const glow = keyframes`
  0%   { box-shadow:0 0 0 4px #ffe600,0 0 15px 8px #ffd000; }
  100% { box-shadow:5px 5px 0 #000; }
`;

const Wrapper = styled.div<{ $highlight?: boolean }>`
  .brutalist-card {
    width: 320px;
    min-height: 400px;
    border: 4px solid #000;
    background:#fff;
    padding:1.5rem;
    box-shadow:5px 5px 0 #fff;
    font-family: "Arial", sans-serif;

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
    font-size:1rem;
    text-transform:uppercase;
  }

  .brutalist-card__message {
    margin-top:1rem;
    color:#000;
    font-size:0.9rem;
    line-height:1.4;
    border-bottom:2px solid #fff;
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
  .brutalist-card__button:hover         { transform:translate(-2px,-2px); box-shadow:7px 7px 0 #000; }

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
