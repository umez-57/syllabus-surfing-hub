import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface UploadFormData {
  title: string;
  courseCode: string;
  departmentId: string;
  file: FileList;
  credits: number;
  description: string;
}

interface FileUploadFormProps {
  onClose: () => void;
}

export const FileUploadForm = ({ onClose }: FileUploadFormProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UploadFormData>();

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: UploadFormData) => {
    try {
      setIsUploading(true);
      const file = data.file[0]; // Get the uploaded file

      if (!file) {
        toast({
          title: "Error",
          description: "Please select a file to upload",
          variant: "destructive",
        });
        return;
      }

      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("syllabi") // Ensure the bucket name matches
        .upload(`files/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("File upload error:", uploadError);
        throw new Error("Failed to upload file.");
      }

      // Insert metadata into the database
      const { error: dbError } = await supabase.from("syllabi").insert({
        title: data.title,
        course_code: data.courseCode,
        department_id: data.departmentId,
        credits: data.credits,
        description: data.description,
        file_path: uploadData.path, // Store the exact path in the database
        file_name: file.name,
      });

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw dbError;
      }

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error in file upload:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Data Structures and Algorithms" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="CSE2001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credits</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credits" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4].map((credit) => (
                    <SelectItem key={credit} value={credit.toString()}>
                      {credit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Add a brief description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Syllabus File (PDF)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => onChange(e.target.files)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Syllabus"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
