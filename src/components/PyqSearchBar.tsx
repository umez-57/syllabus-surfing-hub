// src/components/PyqSearchBar.tsx

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PyqCard } from "./PyqCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PyqSearchBarProps {
  department_id: string;
}

export function PyqSearchBar({ department_id }: PyqSearchBarProps) {
  const [searchText, setSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const { toast } = useToast();

  console.log("[DEBUG] PyqSearchBar -> department_id:", department_id);
  console.log("[DEBUG] PyqSearchBar -> current searchText:", searchText);

  // React Query: fetch from "pyqs"
  const {
    data: pyqs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pyqs", department_id, searchText],
    queryFn: async () => {
      try {
        console.log("[DEBUG] Query fn called with dept:", department_id);

        let query = supabase
          .from<any>("pyqs")
          .select("*")
          .eq("department_id", department_id)
          .order("created_at", { ascending: false });

        if (searchText.trim().length > 0) {
          query = query.or(
            `title.ilike.%${searchText}%,course_code.ilike.%${searchText}%`
          );
        }

        const { data, error } = await query;
        console.log("[DEBUG] Supabase response:", data, "error:", error);

        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch PYQs. Check console for details.",
            variant: "destructive",
          });
          console.error("[DEBUG] Query error:", error);
          return [];
        }

        return data || [];
      } catch (err) {
        console.error("[DEBUG] Catch block error:", err);
        toast({
          title: "Error",
          description: "Unexpected error fetching PYQs.",
          variant: "destructive",
        });
        return [];
      }
    },
    // Optional: see if the query is refetched
    onSuccess: (fetched) => {
      console.log("[DEBUG] onSuccess -> Fetched pyqs:", fetched);
    },
    onError: (err) => {
      console.error("[DEBUG] onError -> Query error:", err);
    },
    staleTime: 60_000,
  });

  // Now log what we got from React Query
  console.log("[DEBUG] Render -> pyqs length:", pyqs.length, "isLoading:", isLoading, "isError:", isError);

  const displayedPyqs = pyqs.slice(0, visibleCount);

  function handleLoadMore() {
    console.log("[DEBUG] handleLoadMore -> was:", visibleCount, "now:", visibleCount + 6);
    setVisibleCount((prev) => prev + 6);
  }

  function handleSearchChange(val: string) {
    console.log("[DEBUG] handleSearchChange -> new val:", val);
    setSearchText(val);
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      {/* Search Input */}
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search for PYQs..."
          className="pl-10 pr-4 py-3 text-md text-black rounded-xl border-2 border-accent hover:border-primary/20 w-full"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {isLoading ? (
        // Loading spinner
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {displayedPyqs.length > 0 ? (
              displayedPyqs.map((pyq: any) => (
                <PyqCard
                  key={pyq.id}
                  id={pyq.id}
                  title={pyq.title}
                  department_id={pyq.department_id}
                  course_code={pyq.course_code}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                {searchText
                  ? "No question papers found matching your search."
                  : "No question papers in this department yet."
                }
              </div>
            )}
          </div>

          {displayedPyqs.length < pyqs.length && displayedPyqs.length > 0 && (
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
