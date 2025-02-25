// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Old homepage component (previously at "/")
import Index from "./pages/Index";

// Auth + other pages
import Auth from "./pages/Auth";
import { FileManagement } from "./components/admin/FileManagement";
import { NotesHome } from "./pages/NotesHome";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Guide from "./pages/Guide";

// >>> LandingPage now has a default export <<<
import LandingPage from "./pages/LandingPage";

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

    return () => {
      mounted = false;
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
            {/*
              LandingPage at "/"
              Old homepage (Index) at "/home"
            */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Index />} />

            {/* Public Routes */}
            <Route path="/login" element={<Auth />} />
            <Route path="/notes" element={<NotesHome />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
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

            {/* 404 fallback -> Landing Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
