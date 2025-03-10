// src/pages/Auth.tsx

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hero } from "@/components/hero"; // <-- use your Hero component for background

export default function Auth() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [authView, setAuthView] = useState<"sign_in" | "sign_up" | "magic_link" | "forgotten_password">("sign_in");
  // ^ optional: track current view from the outside, or let supabase handle internally

  useEffect(() => {
    let isMounted = true;

    const handleRedirection = async (session: any) => {
      if (!isMounted || hasRedirected || !session?.user) return;
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setErrorMessage("Error fetching user role. Please try again.");
          return;
        }
        setHasRedirected(true);
        if (profile?.role === "admin") {
          navigate("/adminpanelumez", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Redirection error:", err);
        setErrorMessage("Unexpected error. Please try again.");
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          setErrorMessage("Session check failed. Please try again.");
          if (isMounted) setIsInitializing(false);
          return;
        }

        if (session?.user) {
          await handleRedirection(session);
        } else {
          if (isMounted) setIsInitializing(false);
        }
      } catch (err) {
        console.error("Session check error:", err);
        setErrorMessage("Session check failed. Please try again.");
        if (isMounted) setIsInitializing(false);
      }
    };

    checkSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (event === "SIGNED_IN" && session) {
          await handleRedirection(session);
        } else if (event === "SIGNED_OUT") {
          setHasRedirected(false);
          navigate("/login", { replace: true });
        }
      }
    );

    return () => {
      isMounted = false;
      (subscription as any).unsubscribe?.();
    };
  }, [navigate, hasRedirected]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Hero background behind everything */}
      <Hero className="absolute inset-0 -z-10" gradient blur />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="transition-all duration-300 w-full max-w-md"
          // The "transition-all" helps soften the content swap for sign-in vs sign-up
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight " >
                Welcome 
              </CardTitle>
              <CardDescription>
                Sign in or create an account below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <SupabaseAuth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      // Adjust these brand colors for a darker theme
                      colors: {
                        brand: "#222222", // background for sign in/up forms
                        brandAccent: "#333333", // accent color for buttons/links
                      },
                    },
                  },
                }}
                providers={[]}
                // onViewChange={(view) => setAuthView(view)} // optional, if you want to track sign_in vs sign_up
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
