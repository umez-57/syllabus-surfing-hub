import React, { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NotesCard } from "./NotesCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface NotesSearchBarProps {
  department_id: string;
}

export function NotesSearchBar({ department_id }: NotesSearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const { toast } = useToast();

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes", department_id, searchText],
    queryFn: async () => {
      try {
        let query = supabase
          .from("notes")
          .select("*")
          .eq("department_id", department_id)
          .order("created_at", { ascending: false });

        if (searchText.trim().length > 0) {
          query = query.or(
            `title.ilike.%${searchText}%,description.ilike.%${searchText}%`
          );
        }

        const { data, error } = await query;
        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch notes. Please try again.",
            variant: "destructive",
          });
          return [];
        }

        return data || [];
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 1000 * 60,
  });

  const displayedNotes = notes.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
  const handleSearchChange = (value: string) => setSearchText(value);

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search for notes..."
          className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedNotes.length > 0 ? (
            displayedNotes.map((note) => (
              <NotesCard
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                department_id={note.department_id}
                course_code={note.course_code}
                file_path={note.file_path}
                file_name={note.file_name}
                notes_by={note.notes_by}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {searchText
                ? "No notes found matching your search."
                : "No notes found for this department yet."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
