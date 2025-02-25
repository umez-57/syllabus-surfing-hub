import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SyllabusCard } from "./SyllabusCard";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const { toast } = useToast();

  // React Query to fetch syllabi
  const { data: syllabi = [], isLoading } = useQuery({
    queryKey: ["syllabi", search],
    queryFn: async () => {
      try {
        let query = supabase
          .from("syllabi")
          .select(`
            id,
            title,
            course_code,
            description,
            credits,
            file_path,
            file_name,
            department:departments(name),
            uploader:profiles(email)
          `)
          .order("created_at", { ascending: false });

        if (search) {
          query = query.or(
            `course_code.ilike.%${search}%,title.ilike.%${search}%,description.ilike.%${search}%`
          );
        }

        const { data, error } = await query;
        if (error) {
          console.error("Error fetching syllabi:", error);
          toast({
            title: "Error",
            description: "Failed to fetch syllabi. Please try again.",
            variant: "destructive",
          });
          return [];
        }
        return data || [];
      } catch (error) {
        console.error("Error in search query:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 60_000, // 1 minute
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Are we actively searching?
  const isSearching = search.trim().length > 0;
  // Chunk size for "Load More"
  const chunkSize = isSearching ? 10 : 6;

  // Show only up to "visibleCount" syllabi
  const displayedSyllabi = syllabi.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + chunkSize);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      {/* Search Input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for any subject syllabus..."
          className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20 transition-all w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(isSearching ? 10 : 6);
          }}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Loading or Cards */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <>
          {/* Card Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {displayedSyllabi.length > 0 ? (
              displayedSyllabi.map((syllabus) => (
                <SyllabusCard
                  key={syllabus.id}
                  title={syllabus.title}
                  code={syllabus.course_code}
                  description={syllabus.description || "No description available"}
                  credits={syllabus.credits || 0}
                  filePath={syllabus.file_path}
                  fileName={syllabus.file_name || "syllabus.pdf"}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                {search
                  ? "No syllabi found matching your search."
                  : "Start typing to search for syllabi."}
              </div>
            )}
          </div>

          {/* Load More / Search Message */}
          {isSearching ? (
            displayedSyllabi.length < syllabi.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                  Load More
                </button>
              </div>
            )
          ) : (
            syllabi.length > 6 && (
              <p className="text-center text-gray-600 mt-6">
                Want to see more? Use the search bar above to find additional syllabi!
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};
