// src/components/PyqCard.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Eye, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { fetchFileFromDrivePyq } from "@/integrations/google";

interface PyqCardProps {
  id: string;
  title: string;
  department_id: string;
  course_code: string;
}

/**
 * A "brutalist" styled card for PYQ, mirroring NotesCard layout.
 * Single button that triggers a Google Drive fetch (handleView).
 */
export function PyqCard({
  id,
  title,
  department_id,
  course_code,
}: PyqCardProps) {
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check user session
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleView = async () => {
    setLoadingDownload(true);
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        toast.error("You must be logged in to view question papers.");
        navigate("/login");
        return;
      }

      // Attempt to fetch pyq.zip from Google Drive
      const fileLink = await fetchFileFromDrivePyq(course_code);
      if (fileLink) {
        window.open(fileLink, "_blank");
        toast.success("Opening Google Drive file...");
      } else {
        toast.error("No pyq.zip found for this course.");
      }
    } catch (error: any) {
      console.error("Error during PYQ fetch:", error);
      toast.error(error.message || "Failed to fetch PYQ file.");
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="brutalist-card">
        {/* Top Header */}
        <div className="brutalist-card__header">
          {/* Icon area (exclamation sign, same as notes) */}
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 
                   2 12s4.48 10 10 10 
                   10-4.48 10-10S17.52 2 12 2zm1 
                   15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
          </div>
          <div className="brutalist-card__alert">
            {title || "Untitled PYQ"}
          </div>
        </div>

        {/* Middle content: course code */}
        <div className="brutalist-card__message">
          <strong>Course Code:</strong> {course_code || "N/A"}
        </div>

        {/* Action area: single "View" link with spinner + Eye icon */}
        <div className="brutalist-card__actions">
          <a
            className="brutalist-card__button brutalist-card__button--mark"
            onClick={handleView}
          >
            {loadingDownload ? (
              <ClipLoader size={16} color="#000" />
            ) : (
              <>
                <Eye style={{ marginRight: 4 }} />
                View
              </>
            )}
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .brutalist-card {
    width: 320px;
    min-height: 200px; /* match the notes card’s height */
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
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
    font-size: 0.8rem; /* match notes card title size */
    text-transform: uppercase;
  }

  .brutalist-card__message {
    margin-top: 1rem;
    color: #000;
    font-size: 0.9rem;
    line-height: 1.4;
    border-bottom: 2px solid #000;
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

  .brutalist-card__button:active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }
`;
