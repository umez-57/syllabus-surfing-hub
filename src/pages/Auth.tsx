import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    console.log("Auth component mounted"); // Debug log

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session); // Debug log for auth state changes
      
      if (event === "SIGNED_IN") {
        console.log("User signed in successfully"); // Debug log
        
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", session?.user?.email)
          .maybeSingle();
        
        console.log("Profile data:", profile, "Profile error:", profileError); // Debug log
        
        if (profile?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
      if (event === "SIGNED_OUT") {
        console.log("User signed out"); // Debug log
        setErrorMessage("");
      }
      // Handle authentication errors
      if (event === "USER_UPDATED" && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.log("Auth error:", error); // Debug log
          setErrorMessage(getErrorMessage(error));
        }
      }
    });

    // Check initial session
    const checkSession = async () => {
      console.log("Checking initial session"); // Debug log
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Initial session:", session, "Error:", error); // Debug log
      
      if (session) {
        navigate("/");
      }
      if (error) {
        console.log("Session check error:", error); // Debug log
        setErrorMessage(getErrorMessage(error));
      }
    };
    
    checkSession();
    return () => subscription.unsubscribe();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <Card className={`w-full max-w-md transition-transform duration-700 perspective-1000 ${isFlipped ? "rotate-y-180" : ""}`}>
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
                    brandAccent: "rgb(234, 56, 76, 0.8)",
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;