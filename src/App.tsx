import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { FileManagement } from "./components/admin/FileManagement";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { NotesHome } from "./pages/NotesHome";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // Privacy Policy Page
import TermsOfService from "./pages/TermsOfService"; // Terms of Service Page
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // Prevent updates on unmounted component

    const checkAuth = async () => {
      try {
        setIsLoading(true);

        // Fetch session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error("No session found or session error:", sessionError);
          if (isMounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
        }

        // Fetch user role from "profiles" table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          if (isMounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
        }

        if (isMounted) {
          setIsAuthenticated(true);
          setIsAdmin(profile?.role === "admin");
        }
      } catch (error) {
        console.error("Error in auth check:", error);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial check
    checkAuth();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_OUT") {
        console.log("User signed out.");
        if (isMounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
        return;
      }

      if (event === "SIGNED_IN" && session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (isMounted) {
          setIsAuthenticated(true);
          setIsAdmin(profile?.role === "admin");
        }
      }
    });

    return () => {
      isMounted = false; // Prevent memory leaks
      subscription.unsubscribe(); // Unsubscribe from auth state changes
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/notes" element={<NotesHome />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Admin Route */}
            <Route
              path="/adminpanelumez"
              element={
                isAuthenticated && isAdmin ? (
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
                    <FileManagement />
                  </div>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* 404 Page - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
