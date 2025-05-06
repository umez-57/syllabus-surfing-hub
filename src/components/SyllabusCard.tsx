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

/* ------------------------------------------------------------------ */
/* props                                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */

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
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loadingView, setLoadingView] = useState(false);
  const navigate = useNavigate();

  /* auth */
  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, []);

  /* VIEW */
  const handleView = async () => {
    if (!filePath) {
      toast.error("File path is missing for viewing.");
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

      const blobUrl = URL.createObjectURL(data);
      setPdfBlobUrl(blobUrl);
    } catch {
      toast.error("Failed to load file.");
    } finally {
      setLoadingView(false);
    }
  };

  /* SHARE */
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/home?shared=${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Couldn’t copy link – please copy manually.");
    }
  };

  /* render */
  return (
    <StyledWrapper
      highlight={highlight}
      id={`card-${id}`} /* 🏷️ for scrollIntoView */
    >
      <div className="brutalist-card">
        {/* header */}
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          {/* view */}
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

          {/* share */}
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
      {pdfBlobUrl && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-3/4 bg-white rounded-lg shadow-lg">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfBlobUrl} />
            </Worker>
            <button
              onClick={() => {
                URL.revokeObjectURL(pdfBlobUrl);
                setPdfBlobUrl(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 px-3 py-1 flex items-center"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </button>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
}

/* ------------------------------------------------------------------ */
/* styles                                                             */
/* ------------------------------------------------------------------ */
const glow = keyframes`
  0%   { box-shadow: 0 0 0px 4px #ffe600, 0 0 15px 8px #ffd000; }
  100% { box-shadow: 5px 5px 0 #000; }
`;

const StyledWrapper = styled.div<{ highlight?: boolean }>`
  .brutalist-card {
    width: 320px;
    min-height: 400px;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 5px 5px 0 #fff;
    font-family: "Arial", sans-serif;

    ${({ highlight }) =>
      highlight &&
      css`
        animation: ${glow} 10s ease-out forwards;
      `}
  }
  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.5rem;
  }

  .brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: #fff;
  }

  .brutalist-card__alert {
    font-weight: 900;
    color: #000;
    font-size: 1.rem;
    text-transform: uppercase;
  }

  .brutalist-card__message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #fff;
    padding-bottom: 1rem;
    font-weight: 600;
  }

  .brutalist-card__actions {
    margin-top: 1rem;
  }

  .brutalist-card__button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #000;
    background-color: #fff;
    color: #000;
    position: relative;
    transition: all 0.2s ease;
    box-shadow: 5px 5px 0 #000;
    overflow: hidden;
    text-decoration: none;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .brutalist-card__button--read {
    background-color: #000;
    color: #fff;
  }

  .brutalist-card__button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  .brutalist-card__button:hover::before {
    left: 100%;
  }

  .brutalist-card__button:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 #000;
  }

  .brutalist-card__button--mark:hover {
    background-color: #296fbb;
    border-color: #296fbb;
    color: #fff;
    box-shadow: 7px 7px 0 #004280;
  }

  .brutalist-card__button--read:hover {
    background-color: #ff0000;
    border-color: #ff0000;
    color: #fff;
    box-shadow: 7px 7px 0 #800000;
  }

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }
`;

