import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileUploadForm } from "./FileUploadForm";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileManagement = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: files, isLoading, refetch } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from("syllabi").list();
      if (error) throw error;
      return data || [];
    },
  });

  const handleDelete = async (filename: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase.storage
        .from("syllabi")
        .remove([filename]);

      if (error) {
        toast.error(`Error deleting file: ${error.message}`);
      } else {
        toast.success("File deleted successfully!");
        await queryClient.invalidateQueries({ queryKey: ["files"] });
        refetch();
      }
    } catch (error: any) {
      toast.error(`Error deleting file: ${error.message}`);
    }
  };

  const handleUpload = async (file: File, metadata: any) => {
    setUploading(true);
    try {
      const timestamp = new Date().getTime();
      const fileExt = file.name.split(".").pop();
      const fileName = `${metadata.code}_${timestamp}.${fileExt}`;
      const filePath = `files/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("syllabi")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { error: insertError } = await supabase
        .from("syllabi_data")
        .insert([
          {
            title: metadata.title,
            code: metadata.code,
            description: metadata.description,
            credits: metadata.credits,
            file_path: filePath,
            file_name: fileName,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      toast.success("File uploaded successfully!");
    } catch (error: any) {
      toast.error(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
      await queryClient.invalidateQueries({ queryKey: ["files"] });
      refetch();
    }
  };

  return (
    <div>
      <FileUploadForm onUpload={handleUpload} />

      <h2 className="text-xl font-semibold mt-6 mb-2">Uploaded Files</h2>
      {isLoading ? (
        <p>Loading files...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {files &&
            files.map((file) => (
              <div
                key={file.name}
                className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between"
              >
                <span>{file.name}</span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(file.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export { FileManagement };
