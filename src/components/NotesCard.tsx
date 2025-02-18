import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { fetchFileFromDrive } from "@/integrations/google";
import { ClipLoader } from "react-spinners";

interface NotesCardProps {
  id: string;
  title: string;
  description: string;
  department_id: string;
  course_code: string;
  file_path: string;
  file_name: string;
  notes_by: string;
}

export function NotesCard({
  id,
  title,
  description,
  department_id,
  course_code,
  notes_by,
}: NotesCardProps) {
  const [loadingDownload, setLoadingDownload] = useState(false);
  const navigate = useNavigate();

  /**
   * Optional: You can remove this if you don't need the user for anything else.
   * If you do keep it, it's purely for display or other checks, not for the
   * actual download logic.
   */
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleDownload = async () => {
    setLoadingDownload(true);

    try {
      // **Always** check the up-to-date user session
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (!currentUser) {
        toast.error("You must be logged in to download.");
        navigate("/login");
        return;
      }

      // If user is present, proceed to fetch the file from Google Drive
      const fileLink = await fetchFileFromDrive(course_code, notes_by);
      if (fileLink) {
        window.open(fileLink, "_blank");
        toast.success("Redirecting to Google Drive file...");
      } else {
        toast.error("No file link found for this note.");
      }
    } catch (error: any) {
      console.error("Error during download:", error);
      toast.error(error.message || "Failed to fetch file.");
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <Card className="w-11/12 max-w-2xl mx-auto hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>
          {course_code} • Notes by: <span className="font-medium">{notes_by}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <div className="flex justify-end px-2 pb-4">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex-1"
          disabled={loadingDownload}
        >
          {loadingDownload ? (
            <ClipLoader size={16} color="#4F46E5" />
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              View
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
