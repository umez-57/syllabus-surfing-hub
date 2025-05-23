
// src/components/SearchBar.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SyllabusCard } from "./SyllabusCard";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

export const SearchBar: React.FC = () => {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(6);
  const { toast } = useToast();

  const { search: loc } = useLocation();
  const sharedId = new URLSearchParams(loc).get("shared");

  const { data: raw = [], isLoading } = useQuery({
    queryKey: ["syllabi", text],
    queryFn: async () => {
      try {
        let q = supabase
          .from("syllabi")
          .select("id,title,course_code,description,credits,file_path,file_name")
          .order("id", { ascending: false });

        if (text.trim()) {
          const term = `*${text.trim()}*`;
          q = q.or(
            `course_code.ilike.${term},title.ilike.${term},description.ilike.${term}`
          );
        }

        const { data, error } = await q;
        if (error) throw error;
        return data ?? [];
      } catch (err) {
        console.error("Search query error:", err);
        toast({
          title: "Error",
          description: "Failed to fetch syllabi. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const syllabi = useMemo(() => {
    if (!sharedId) return raw;
    const idx = raw.findIndex((s: any) => s.id === sharedId);
    if (idx === -1) return raw;
    return [raw[idx], ...raw.slice(0, idx), ...raw.slice(idx + 1)];
  }, [raw, sharedId]);

  const slice = syllabi.slice(0, visible);

  return (
    <div className="w-full space-y-8">
      {/* Search box - Full width with proper container */}
      <div className="relative w-full max-w-4xl mx-auto">
        <Input
          type="search"
          placeholder="Search with Course Code or Subject Name"
          className="w-full pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-400 focus:border-white/20 transition-all duration-300"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setVisible(e.target.value.trim() ? 10 : 6);
          }}
        />
        <SearchIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={24}
        />
      </div>

      {/* Results - Full width grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {slice.length ? (
                slice.map((s) => (
                  <SyllabusCard
                    key={s.id}
                    id={s.id}
                    title={s.title}
                    code={s.course_code}
                    description={s.description ?? "No description available"}
                    credits={s.credits ?? 0}
                    filePath={s.file_path}
                    fileName={s.file_name ?? "syllabus.pdf"}
                    highlight={s.id === sharedId}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-8">
                  {text ? "No syllabi match your search." : "Start typing to search."}
                </div>
              )}
            </div>
          </div>

          {/* Message instead of Load More button */}
          {syllabi.length > 6 && !text.trim() && (
            <p className="text-center text-gray-400 mt-8">
              Want to see more? Use the search bar to find additional syllabus
            </p>
          )}
        </>
      )}
    </div>
  );
};
