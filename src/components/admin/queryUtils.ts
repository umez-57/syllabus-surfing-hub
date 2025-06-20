
import { QueryClient } from "@tanstack/react-query";

// Helper function to safely invalidate queries
export const safeInvalidateQueries = (queryClient: QueryClient, keys: string[]) => {
  queryClient.invalidateQueries({ queryKey: keys });
};
