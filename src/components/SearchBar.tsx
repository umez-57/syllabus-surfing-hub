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

  /* shared=<uuid> */
  const { search: loc } = useLocation();
  const sharedId = new URLSearchParams(loc).get("shared");

  /* fetch */
  const { data: raw = [], isLoading } = useQuery({
    queryKey: ["syllabi", text],
    queryFn: async () => {
      try {
        let q = supabase
          .from("syllabi")
          .select("id,title,course_code,description,credits,file_path,file_name")
          .order("id", { ascending: false });

        if (text.trim()) {
          /* use * wildcards to avoid %25 encoding issue */
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

  /* put shared card first */
  const syllabi = useMemo(() => {
    if (!sharedId) return raw;
    const idx = raw.findIndex((s: any) => s.id === sharedId);
    if (idx === -1) return raw;
    return [raw[idx], ...raw.slice(0, idx), ...raw.slice(idx + 1)];
  }, [raw, sharedId]);

  /* make sure it’s rendered */
  useEffect(() => {
    if (!sharedId) return;
    const idx = syllabi.findIndex((s: any) => s.id === sharedId);
    if (idx !== -1 && idx + 1 > visible) setVisible(idx + 1);
  }, [sharedId, syllabi, visible]);

  /* scroll once */
  useEffect(() => {
    if (!sharedId) return;
    const el = document.getElementById(`card-${sharedId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [sharedId, syllabi]);

  /* helpers */
  const searching = text.trim().length > 0;
  const slice = syllabi.slice(0, visible);
  const loadMore = () => setVisible((p) => p + (searching ? 10 : 6));

  /* ─── render ─── */
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      {/* search box */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for any subject syllabus..."
          className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20 w-full"
          value={text}
          onChange={(e) => {
            const v = e.target.value;
            setText(v);
            setVisible(v.trim() ? 10 : 6);
          }}
        />
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* results */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
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
              <div className="col-span-full text-center text-gray-500">
                {text ? "No syllabi match your search." : "Start typing to search."}
              </div>
            )}
          </div>

          {/* load more */}
          {searching ? (
            slice.length < syllabi.length && (
              <div className="flex justify-center mt-6">
                <button onClick={loadMore} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                  Load More
                </button>
              </div>
            )
          ) : (
            syllabi.length > 6 && (
              <p className="text-center text-gray-600 mt-6">
                Want to see more? Use the search bar to find additional syllabi!
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};
