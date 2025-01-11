import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        // Check if user is admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("email", "umeshrockz57@gmail.com")
          .single();

        if (profile?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
      if (event === "SIGNED_OUT") {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.code) {
        case "invalid_credentials":
          return "Invalid email or password. Please check your credentials and try again.";
        case "email_not_confirmed":
          return "Please verify your email address before signing in.";
        case "user_not_found":
          return "No user found with these credentials.";
        case "invalid_grant":
          return "Invalid login credentials.";
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
            Enter your credentials to continue
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
              theme: "default",
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