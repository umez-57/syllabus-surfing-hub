import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SyllabusCard, SyllabusCardProps } from "@/components/SyllabusCard";

export default function SyllabiPage() {
  const { search } = useLocation();
  const sharedId = new URLSearchParams(search).get("shared");

  const [syllabi, setSyllabi] = useState<SyllabusCardProps[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("syllabi")
        .select(
          "id, title, course_code, description, credits, file_path, file_name"
        )
        .order("id", { ascending: false });

      if (!error && data) setSyllabi(data as unknown as SyllabusCardProps[]);
    })();
  }, []);

  return (
    <div
      className="container mx-auto py-10 grid gap-6
                 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
      {syllabi.map((item) => (
        <SyllabusCard
          key={item.id}
          {...item}
          highlight={item.id === sharedId}
        />
      ))}
    </div>
  );
}
