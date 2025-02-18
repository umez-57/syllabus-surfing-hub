import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Alert as SonnerAlert } from "sonner"; // If you have a separate Alert import, adjust as needed

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    /**
     * After sign-in, fetch the user’s role from "profiles".
     * If found, redirect to admin panel or home.
     */
    const handleRedirection = async (session: any) => {
      if (!isMounted || hasRedirected || !session?.user) return;

      try {
        console.log("Fetching user role...");
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session.user.email)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setErrorMessage("Error fetching user role. Please try again.");
          setIsInitializing(false); // ensure spinner stops
          return;
        }

        console.log("User role fetched:", profile?.role);

        // Mark that we've already redirected once
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
        // Always ensure we stop loading
        if (isMounted) setIsInitializing(false);
      }
    };

    /**
     * On mount, check if there's a current session.
     */
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
          console.log("Initial session found:", session);
          await handleRedirection(session);
        } else {
          // No session => stop loading
          if (isMounted) setIsInitializing(false);
        }
      } catch (err) {
        console.error("Session check error:", err);
        setErrorMessage("Session check failed. Please try again.");
        if (isMounted) setIsInitializing(false);
      }
    };

    checkSession();

    /**
     * Listen for auth state changes:
     * - SIGNED_IN => fetch role & redirect
     * - SIGNED_OUT => navigate to "/login"
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === "SIGNED_IN" && session) {
        console.log("User just signed in. Attempting redirection...");
        await handleRedirection(session);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out. Redirecting to /login...");
        setHasRedirected(false);
        navigate("/login", { replace: true });
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
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
                  colors: {
                    brand: "rgb(234, 56, 76)",
                    brandAccent: "rgba(234, 56, 76, 0.8)",
                  },
                },
              },
            }}
            providers={[]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
