import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NotesCard } from "./NotesCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

interface NotesSearchBarProps {
  department_id: string;
}

export function NotesSearchBar({ department_id }: NotesSearchBarProps) {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(6);
  const { toast } = useToast();

  /* ?shared=<uuid> */
  const { search: loc } = useLocation();
  const sharedId = new URLSearchParams(loc).get("shared");

  /* fetch notes */
  const { data: raw = [], isLoading } = useQuery({
    queryKey: ["notes", department_id, text],
    queryFn: async () => {
      try {
        let q = supabase
          .from("notes")
          .select("*")
          .eq("department_id", department_id)
          .order("id", { ascending: false });

        if (text.trim()) {
          const term = `*${text.trim()}*`;
          q = q.or(
            `title.ilike.${term},description.ilike.${term},notes_by.ilike.${term}`
          );
        }

        const { data, error } = await q;
        if (error) throw error;
        return data ?? [];
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch notes. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 60_000,
  });

  /* bring shared card first */
  const notes = useMemo(() => {
    if (!sharedId) return raw;
    const idx = raw.findIndex((n: any) => n.id === sharedId);
    if (idx === -1) return raw;
    return [raw[idx], ...raw.slice(0, idx), ...raw.slice(idx + 1)];
  }, [raw, sharedId]);

  /* ensure visible */
  useEffect(() => {
    if (!sharedId) return;
    const idx = notes.findIndex((n: any) => n.id === sharedId);
    if (idx !== -1 && idx + 1 > visible) setVisible(idx + 1);
  }, [sharedId, notes, visible]);

  /* scroll once */
  useEffect(() => {
    if (!sharedId) return;
    const el = document.getElementById(`card-${sharedId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [sharedId, notes]);

  /* helpers */
  const searching = text.trim().length > 0;
  const slice = notes.slice(0, visible);
  const loadMore = () => setVisible((p) => p + 6);

  /* ─── render ─── */
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      {/* search box */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for notes..."
          className="pl-10 pr-4 py-6 text-lg text-black rounded-xl border-2 border-accent hover:border-primary/20 w-full"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setVisible(e.target.value.trim() ? 10 : 6);
          }}
        />
        <Search
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
              slice.map((n: any) => (
                <NotesCard
                  key={n.id}
                  {...n}
                  highlight={n.id === sharedId}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                {text ? "No notes match your search." : "No notes yet."}
              </div>
            )}
          </div>

          {/* load more */}
          {slice.length < notes.length && slice.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white/50"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
