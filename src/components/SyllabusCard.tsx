import React, { useState, useEffect } from "react";
import { Download, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners"; // Import loader

interface SyllabusCardProps {
  title: string;
  code: string;
  description: string;
  credits: number;
  filePath: string; // File path in Supabase
  fileName: string; // File name
}

export const SyllabusCard = ({
  title,
  code,
  description,
  credits,
  filePath,
  fileName,
}: SyllabusCardProps) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const [loadingView, setLoadingView] = useState(false); // Loader for View button
  const [loadingDownload, setLoadingDownload] = useState(false); // Loader for Download button
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleView = async () => {
    if (!filePath) {
      toast.error("File path is missing for viewing.");
      return;
    }

    setLoadingView(true); // Show loader for View
    try {
      const fullPath = filePath.startsWith("files/") ? filePath : `files/${filePath}`;

      const { data, error } = await supabase.storage.from("syllabi").download(fullPath);

      if (error) {
        console.error("Error downloading file for viewing:", error.message);
        toast.error("Failed to load file for viewing.");
        return;
      }

      const blobUrl = URL.createObjectURL(data);
      setPdfBlobUrl(blobUrl);
    } catch (error) {
      console.error("Error viewing file:", error);
      toast.error("Failed to load file.");
    } finally {
      setLoadingView(false); // Hide loader
    }
  };

  const handleDownload = async () => {
    if (!user) {
      toast.error("You need to be logged in to download files.");
      navigate("/login");
      return;
    }

    if (!filePath) {
      toast.error("File path is missing for download.");
      return;
    }

    setLoadingDownload(true); // Show loader for Download
    try {
      const fullPath = filePath.startsWith("files/") ? filePath : `files/${filePath}`;

      const { data, error } = await supabase.storage.from("syllabi").download(fullPath);

      if (error) {
        console.error("Error downloading file:", error.message);
        toast.error("Failed to download file.");
        return;
      }

      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "syllabus.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("File downloaded successfully.");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file.");
    } finally {
      setLoadingDownload(false); // Hide loader
    }
  };

  return (
    <>
      <Card className="w-full max-w-md animate-fadeIn hover:shadow-lg transition-all border-red-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
          <CardDescription>
            Course Code: {code} | Credits: {credits}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={handleView}
            className="border-primary/20 hover:bg-primary/5"
            disabled={loadingView} // Disable View button while loading
          >
            {loadingView ? (
              <ClipLoader size={16} color="#4F46E5" /> // Loader for View
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
            className="border-primary/20 hover:bg-primary/5"
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
        </CardFooter>
      </Card>

      {/* Modal for Viewing PDF */}
      {pdfBlobUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-3/4 bg-white rounded-lg shadow-lg">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfBlobUrl} />
            </Worker>
            <Button
              onClick={() => {
                URL.revokeObjectURL(pdfBlobUrl);
                setPdfBlobUrl(null);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
