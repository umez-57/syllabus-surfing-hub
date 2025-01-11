import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadForm } from "./FileUploadForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, FileText, Download } from "lucide-react";
import { toast } from "sonner";

export const FileManagement = () => {
  const [page, setPage] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 30;

  const { data: files, isLoading, error } = useQuery({
    queryKey: ['syllabi', page, search],
    queryFn: async () => {
      let query = supabase
        .from('syllabi')
        .select(`
          *,
          department:departments(name),
          uploader:profiles(email)
        `)
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`title.ilike.%${search}%,file_name.ilike.%${search}%,course_code.ilike.%${search}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching syllabi:', error);
        toast.error('Failed to fetch syllabi');
        throw error;
      }
      
      return data;
    },
  });

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('syllabi')
        .download(filePath);
      
      if (error) {
        throw error;
      }

      // Create a download link
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading syllabi. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={() => setShowUploadForm(true)}>Upload New File</Button>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {showUploadForm && (
        <FileUploadForm onClose={() => setShowUploadForm(false)} />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </TableCell>
              </TableRow>
            ) : files?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No syllabi found
                </TableCell>
              </TableRow>
            ) : (
              files?.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">{file.title}</TableCell>
                  <TableCell>{file.course_code}</TableCell>
                  <TableCell>{file.department?.name || 'N/A'}</TableCell>
                  <TableCell>{file.credits || 'N/A'}</TableCell>
                  <TableCell>{file.type || 'syllabus'}</TableCell>
                  <TableCell>{file.uploader?.email || 'N/A'}</TableCell>
                  <TableCell>
                    {new Date(file.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(file.file_path, file.file_name)}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage(p => p + 1)}
          disabled={!files || files.length < ITEMS_PER_PAGE}
        >
          Next
        </Button>
      </div>
    </div>
  );
};