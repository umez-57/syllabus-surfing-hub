import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadFormProps {
  onUpload: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  code: z.string().min(3, {
    message: "Code must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  credits: z.coerce.number().min(1, {
    message: "Credits must be at least 1.",
  }),
  filePath: z.string().optional(),
  fileName: z.string().optional(),
  file: z.any().refine((files) => files?.length === 1, "File is required."),
});

type FormData = z.infer<typeof formSchema>;

const FileUploadForm = ({ onUpload }: FileUploadFormProps) => {
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
      credits: 3,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    setUploading(true);
    const file = values.file[0];
    const filePath = `files/${values.code}_${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from("syllabi")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        toast.error(error.message);
        console.error("Supabase upload error:", error);
        setUploading(false);
        return;
      }

      const { error: dbError } = await supabase.from("syllabi").insert({
        title: values.title,
        code: values.code,
        description: values.description,
        credits: values.credits,
        filePath: data.path,
        fileName: file.name,
      });

      if (dbError) {
        toast.error(dbError.message);
        console.error("Supabase insert error:", dbError);
        setUploading(false);
        return;
      }

      toast.success("File uploaded successfully!");
      onUpload();
      setValue("title", "");
      setValue("code", "");
      setValue("description", "");
      setValue("credits", 3);
      setValue("file", null);
      await queryClient.invalidateQueries({ queryKey: ["syllabi"] });
      
      setUploading(false);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="code">Code</Label>
        <Input id="code" type="text" {...register("code")} />
        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="credits">Credits</Label>
        <Input id="credits" type="number" {...register("credits", { valueAsNumber: true })} />
        {errors.credits && (
          <p className="text-red-500 text-sm">{errors.credits.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          {...register("file")}
          onChange={(e: any) => {
            const files = e.target.files;
            setValue("file", files);
          }}
        />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file.message}</p>
        )}
      </div>
      <Button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};

export { FileUploadForm };
