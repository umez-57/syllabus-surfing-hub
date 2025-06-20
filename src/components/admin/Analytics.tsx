import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Analytics = () => {
  const { data: analytics } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select(`
          *,
          syllabi (
            title,
            course_code
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
      <p className="text-gray-600">Analytics features coming soon...</p>
    </div>
  );
};