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
import { Search } from "lucide-react";

export const FileManagement = () => {
  const [page, setPage] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 30;

  const { data: files, isLoading } = useQuery({
    queryKey: ['syllabi', page, search],
    queryFn: async () => {
      let query = supabase
        .from('syllabi')
        .select('*')
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`title.ilike.%${search}%,file_name.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

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
              <TableHead>Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Upload Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files?.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.title}</TableCell>
                <TableCell>{file.type || 'Syllabus'}</TableCell>
                <TableCell>{file.department_id}</TableCell>
                <TableCell>{file.credits}</TableCell>
                <TableCell>
                  {new Date(file.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
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