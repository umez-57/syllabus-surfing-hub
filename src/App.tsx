import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { FileManagement } from "./components/admin/FileManagement";
import { NotesHome } from "./pages/NotesHome";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true; // track if component is still mounted

    // Wrap the logic in an IIFE to ensure the "finally" always runs
    (async () => {
      setIsLoading(true);
      try {
        // 1) Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return; // still goes to finally block
        }

        if (!session) {
          console.log("No session found");
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return; // still goes to finally block
        }

        // 2) We have a valid session => fetch user role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return; // still goes to finally block
        }

        // Mark user as authenticated; check role
        if (mounted) {
          setIsAuthenticated(true);
          setIsAdmin(profile?.role === "admin");
        }
      } catch (err) {
        console.error("Error in auth check:", err);
        if (mounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    })();

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);

        if (event === "SIGNED_OUT") {
          console.log("User signed out");
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
        }

        if (event === "SIGNED_IN" && session) {
          // Re-check role
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("email", session.user.email)
            .single();

          if (mounted) {
            setIsAuthenticated(true);
            setIsAdmin(profile?.role === "admin");
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
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

            {/* 404 Page -> Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
