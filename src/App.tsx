// src/App.tsx

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

// >>> ADD THIS <<<
import Guide from "./pages/Guide";

const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);

        // 1) Get current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
        }
        if (!session) {
          console.log("No session found");
          if (mounted) {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
          return;
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
          return;
        }

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

    // Optionally re-enable if needed
    // const { data: subscription } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     console.log("Auth state changed:", event);
    //     if (!mounted) return;

    //     if (event === "SIGNED_OUT") {
    //       setIsAuthenticated(false);
    //       setIsAdmin(false);
    //       return;
    //     }
    //     if (event === "SIGNED_IN" && session) {
    //       try {
    //         const { data: profile } = await supabase
    //           .from("profiles")
    //           .select("role")
    //           .eq("email", session.user.email)
    //           .single();
    //         setIsAuthenticated(true);
    //         setIsAdmin(profile?.role === "admin");
    //       } catch (error) {
    //         console.error("Re-check role error:", error);
    //         setIsAuthenticated(false);
    //         setIsAdmin(false);
    //       }
    //     }
    //   }
    // );

    return () => {
      mounted = false;
      // if subscription is re-enabled, cast to any:
      // (subscription as any)?.unsubscribe?.();
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

            {/* >>> ADD THIS ROUTE FOR THE GUIDE <<< */}
            <Route path="/guide" element={<Guide />} />

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
}
