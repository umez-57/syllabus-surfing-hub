import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // First, clear any existing session
    const clearExistingSession = async () => {
      await supabase.auth.signOut();
      localStorage.removeItem('supabase.auth.token');
      console.log("Cleared existing session");
    };

    clearExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }

      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("email", session.user.email)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            setIsAuthenticated(false);
            setIsAdmin(false);
            await supabase.auth.signOut();
            return;
          }

          setIsAuthenticated(true);
          setIsAdmin(profile?.role === "admin");
        } catch (error) {
          console.error("Error in auth state change:", error);
          setIsAuthenticated(false);
          setIsAdmin(false);
          await supabase.auth.signOut();
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth />} />
            <Route
              path="/adminpanelumez"
              element={
                isAuthenticated && isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;