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

  // React Query to fetch notes
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
            `title.ilike.%${searchText}%,description.ilike.%${searchText}%,notes_by.ilike.%${searchText}%`
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
    staleTime: 60_000, // 1 minute
  });

  // Show only up to "visibleCount" items
  const displayedNotes = notes.slice(0, visibleCount);

  // Load more by increments of 6
  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);

  // Handle search updates
  const handleSearchChange = (value: string) => setSearchText(value);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      {/* Search Input */}
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search for notes..."
          className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20 w-full"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Loading or Notes Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {displayedNotes.length > 0 ? (
              displayedNotes.map((note: any) => (
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

          {/* Load More */}
          {displayedNotes.length < notes.length && displayedNotes.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
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
