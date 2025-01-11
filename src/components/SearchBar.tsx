import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SyllabusCard } from "./SyllabusCard";
import { useToast } from "@/components/ui/use-toast";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const { data: syllabi, isLoading } = useQuery({
    queryKey: ['syllabi', search],
    queryFn: async () => {
      try {
        let query = supabase
          .from('syllabi')
          .select(`
            *,
            department:departments(name),
            uploader:profiles(email)
          `)
          .order('created_at', { ascending: false });

        if (search) {
          query = query.or(`
            course_code.ilike.%${search}%,
            title.ilike.%${search}%,
            description.ilike.%${search}%
          `);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching syllabi:', error);
          toast({
            title: "Error",
            description: "Failed to fetch syllabi. Please try again.",
            variant: "destructive",
          });
          return [];
        }
        
        console.log('Search results:', data);
        return data || [];
      } catch (error) {
        console.error('Error in search query:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search for any subject syllabus..."
          className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabi && syllabi.length > 0 ? (
            syllabi.map((syllabus) => (
              <SyllabusCard
                key={syllabus.id}
                title={syllabus.title}
                code={syllabus.course_code}
                description={syllabus.description || "No description available"}
                credits={syllabus.credits || 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {search ? "No syllabi found matching your search." : "Start typing to search for syllabi."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};