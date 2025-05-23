
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface Department {
  id: string;
  name: string;
}

interface FileUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  course_code: string;
  department_id: string;
  type: string;
  credits: number;
  description: string;
  file: FileList;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const selectedDepartment = watch("department_id");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const { data, error } = await supabase
      .from("departments")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching departments:", error);
    } else {
      setDepartments(data || []);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!data.file || data.file.length === 0) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const file = data.file[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${data.department_id}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("syllabi")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase.from("syllabi").insert({
        title: data.title,
        course_code: data.course_code,
        department_id: data.department_id,
        type: data.type,
        credits: data.credits,
        description: data.description,
        file_name: file.name,
        file_path: filePath,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      onSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Course Title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="course_code">Course Code</Label>
        <Input
          id="course_code"
          {...register("course_code", { required: "Course code is required" })}
          placeholder="e.g., CSE101"
        />
        {errors.course_code && (
          <p className="text-sm text-red-500 mt-1">{errors.course_code.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="department">Department</Label>
        <Select onValueChange={(value) => setValue("department_id", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department_id && (
          <p className="text-sm text-red-500 mt-1">{errors.department_id.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="syllabus">Syllabus</SelectItem>
            <SelectItem value="notes">Notes</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
            <SelectItem value="exam">Exam</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="credits">Credits</Label>
        <Input
          id="credits"
          type="number"
          {...register("credits", { valueAsNumber: true })}
          placeholder="3"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Optional description"
        />
      </div>

      <div>
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          {...register("file", { required: "File is required" })}
          accept=".pdf,.doc,.docx"
        />
        {errors.file && (
          <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={uploading}>
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
