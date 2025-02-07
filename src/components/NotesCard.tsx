import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, Download, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { ClipLoader } from "react-spinners"; // Import loader from react-spinners

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
  file_path,
  file_name,
  notes_by,
}: NotesCardProps) {
  const [user, setUser] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [zipContents, setZipContents] = useState<string[]>([]);
  const [loadingView, setLoadingView] = useState(false); // Separate loader for View
  const [loadingDownload, setLoadingDownload] = useState(false); // Separate loader for Download
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, []);

  const handleViewContents = async () => {
    if (!file_path) {
      toast.error("No file available to view.");
      return;
    }

    setLoadingView(true); // Show loader for View
    try {
      const { data, error } = await supabase.storage.from("notes").download(file_path);

      if (error) {
        console.error("Error downloading file:", error.message);
        toast.error("Failed to fetch file.");
        setLoadingView(false); // Hide loader
        return;
      }

      const zip = await JSZip.loadAsync(data);
      const contents = Object.keys(zip.files);
      setZipContents(contents);
      setModalOpen(true);
    } catch (error) {
      console.error("Error reading ZIP file:", error);
      toast.error("Failed to read ZIP file.");
    } finally {
      setLoadingView(false); // Hide loader
    }
  };

  const handleDownload = async () => {
    if (!file_path) {
      toast.error("No file path found for this note.");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to download.");
      navigate("/login");
      return;
    }

    setLoadingDownload(true); // Show loader for Download
    try {
      const { data, error } = await supabase.storage.from("notes").download(file_path);

      if (error) {
        console.error("Error downloading file:", error.message);
        toast.error("Failed to download file.");
        setLoadingDownload(false); // Hide loader
        return;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = file_name || "downloaded_file.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("File downloaded successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error during download.");
    } finally {
      setLoadingDownload(false); // Hide loader
    }
  };

  return (
    <>
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
        <div className="flex justify-between items-center px-2 pb-4">
          <Button
            variant="outline"
            onClick={handleViewContents}
            className="flex-1 mr-2"
            disabled={loadingView} // Disable View button while loading
          >
            {loadingView ? (
              <ClipLoader size={16} color="#4F46E5" /> // Loader for View Contents
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                View
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex-1 ml-2"
            disabled={loadingDownload} // Disable Download button while loading
          >
            {loadingDownload ? (
              <ClipLoader size={16} color="#4F46E5" /> // Loader for Download
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80%] p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contents of {file_name}</h2>
              <button onClick={() => setModalOpen(false)} className="hover:text-gray-700">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <ul className="list-disc pl-5">
              {zipContents.map((file, index) => (
                <li key={index} className="text-sm text-gray-700 mb-1 break-all">
                  {file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
