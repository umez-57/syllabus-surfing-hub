
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Upload, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { FileUploadForm } from "./FileUploadForm";

interface SyllabusFile {
  id: string;
  title: string;
  course_code: string;
  file_name: string;
  file_path: string;
  type?: string;
  credits?: number;
  description?: string;
  created_at: string;
  updated_at: string;
  departments?: {
    name: string;
  };
}

export const FileManagement = () => {
  const [files, setFiles] = useState<SyllabusFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("syllabi")
        .select(`
          *,
          departments (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const deleteFile = async (id: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("syllabi")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("syllabi")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });

      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("syllabi")
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    fetchFiles();
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">File Management</h2>
        <div className="flex gap-2">
          <Button onClick={fetchFiles} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowUploadForm(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>Upload New File</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploadForm
              onSuccess={handleUploadSuccess}
              onCancel={() => setShowUploadForm(false)}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{file.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {file.course_code}
                  </p>
                  {file.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {file.description}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {file.departments?.name && (
                      <Badge variant="secondary">{file.departments.name}</Badge>
                    )}
                    {file.type && (
                      <Badge variant="outline">{file.type}</Badge>
                    )}
                    {file.credits && (
                      <Badge variant="outline">{file.credits} credits</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Uploaded: {new Date(file.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(file.file_path, file.file_name)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteFile(file.id, file.file_path)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {files.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No files uploaded yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
