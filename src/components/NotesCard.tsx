import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {Eye} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  const [user, setUser] = useState<any>(null);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, []);

  const handleDownload = async () => {
    if (!user) {
      toast.error("You must be logged in to download.");
      navigate("/login");
      return;
    }

    setLoadingDownload(true);

    try {
      const fileLink = await fetchFileFromDrive(course_code, notes_by);
      if (fileLink) {
        window.open(fileLink, "_blank");
        toast.success("Redirecting to Google Drive file...");
      }
    } catch (error) {
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
