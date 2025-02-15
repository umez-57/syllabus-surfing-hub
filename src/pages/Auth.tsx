import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true); // Initialization loading state
  const [hasRedirected, setHasRedirected] = useState(false); // Prevent multiple redirections

  useEffect(() => {
    let isMounted = true; // To prevent state updates on unmounted component

    const handleRedirection = async (session) => {
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
          return;
        }

        console.log("User role fetched:", profile?.role);

        // Redirect based on user role
        setHasRedirected(true); // Prevent future redirections
        if (profile?.role === "admin") {
          navigate("/adminpanelumez", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Redirection error:", error);
        setErrorMessage("Unexpected error. Please try again.");
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log("Initial session check:", session);
          await handleRedirection(session);
        } else {
          setIsInitializing(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setErrorMessage("Session check failed. Please try again.");
        setIsInitializing(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in. Redirecting...");
        await handleRedirection(session);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out. Redirecting to login...");
        setHasRedirected(false); // Reset redirection flag on logout
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      isMounted = false; // Cleanup on component unmount
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
          <CardDescription>
            Sign in to your account or create a new one
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
