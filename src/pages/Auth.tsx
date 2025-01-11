import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Function to reset auth state
  const resetAuthState = async () => {
    console.log("Resetting auth state...");
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      await supabase.auth.signOut();
      const { error } = await supabase.auth.getSession();
      if (error) throw error;
    } catch (error) {
      console.error("Error resetting auth state:", error);
      setErrorMessage("Failed to reset auth state. Please refresh the page.");
    } finally {
      setIsLoading(false);
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    console.log("Auth component mounted");
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, "Session:", session?.user?.email);
      
      if (!mounted) return;

      if (event === "SIGNED_IN" && session?.user) {
        console.log("User signed in successfully, checking role...");
        setErrorMessage("");
        
        try {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("email", session.user.email)
            .single();
          
          console.log("Profile data:", profile);
          
          if (profileError) {
            console.error("Profile error:", profileError);
            throw profileError;
          }
          
          if (profile?.role === "admin") {
            console.log("Admin user detected, redirecting to admin panel");
            navigate("/adminpanelumez", { replace: true });
          } else {
            console.log("Regular user detected, redirecting to home");
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          setErrorMessage("Error checking user role. Please try again.");
          await resetAuthState();
        }
      }
    });

    // Check initial session
    const checkSession = async () => {
      if (!mounted) return;
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("Initial session check:", session?.user?.email);
        
        if (error) throw error;
        
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("email", session.user.email)
            .single();
          
          if (profileError) throw profileError;
          
          if (profile?.role === "admin") {
            navigate("/adminpanelumez", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        await resetAuthState();
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };
    
    checkSession();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          return "Invalid email or password. Please check your credentials or sign up if you don't have an account.";
        case "email_not_confirmed":
          return "Please verify your email address before signing in.";
        case "user_not_found":
          return "No user found with these credentials. Please sign up first.";
        case "invalid_grant":
          return "Invalid login credentials. Please check your email and password.";
        default:
          return error.message;
      }
    }
    return error.message;
  };

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
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
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
                  className: {
                    container: "space-y-4",
                    button: "w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors",
                    input: "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/20",
                  },
                }}
                theme="default"
                providers={[]}
                onlyThirdPartyProviders={false}
              />
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetAuthState}
                >
                  Reset Login State
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;