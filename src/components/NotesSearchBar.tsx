import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NotesCard } from "./NotesCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface NotesSearchBarProps {
  department_id: string;
}

export function NotesSearchBar({ department_id }: NotesSearchBarProps) {
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(6);
  const { toast } = useToast();
  const { search: loc } = useLocation();
  const sharedId = new URLSearchParams(loc).get("shared");

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

  const notes = useMemo(() => {
    if (!sharedId) return raw;
    const idx = raw.findIndex((n: any) => n.id === sharedId);
    if (idx === -1) return raw;
    return [raw[idx], ...raw.slice(0, idx), ...raw.slice(idx + 1)];
  }, [raw, sharedId]);

  const slice = notes.slice(0, visible);

  return (
    <div className="w-full space-y-8">
      {/* Search box - Enhanced with glassmorphic design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-4xl mx-auto"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative">
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
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {slice.length ? (
                slice.map((n: any, index: number) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <NotesCard
                      {...n}
                      highlight={n.id === sharedId}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full text-center text-gray-400 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-8"
                >
                  {text ? "No notes match your search." : "Start typing to search."}
                </motion.div>
              )}
            </div>
          </div>

          {notes.length > 6 && !text.trim() && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-400 mt-8"
            >
              Want to see more? Use the search bar to find additional notes
            </motion.p>
          )}
        </>
      )}
    </div>
  );
}