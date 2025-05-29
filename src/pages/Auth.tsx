
import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/moving-border";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertCircle } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

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
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Error fetching user role. Please try again.",
          });
          return;
        }
        setHasRedirected(true);
        
        toast({
          variant: "success",
          title: "Welcome!",
          description: "Successfully signed in to VIT AP Study Hub.",
        });

        if (profile?.role === "admin") {
          navigate("/adminpanelumez", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Redirection error:", err);
        setErrorMessage("Unexpected error. Please try again.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unexpected error occurred. Please try again.",
        });
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
          toast({
            variant: "destructive",
            title: "Session Error",
            description: "Session check failed. Please try again.",
          });
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
        toast({
          variant: "destructive",
          title: "Error",
          description: "Session check failed. Please try again.",
        });
        if (isMounted) setIsInitializing(false);
      }
    };

    checkSession();

    // Enhanced auth state change subscription with better messaging
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (event === "SIGNED_IN" && session) {
          await handleRedirection(session);
        } else if (event === "SIGNED_OUT") {
          setHasRedirected(false);
          navigate("/login", { replace: true });
        } else if (event === "SIGNED_UP") {
          setShowEmailConfirmation(true);
          // Hide the message after 10 seconds
          setTimeout(() => {
            if (isMounted) setShowEmailConfirmation(false);
          }, 10000);
        } else if (event === "PASSWORD_RECOVERY") {
          toast({
            variant: "success",
            title: "Password Reset Email Sent",
            description: "Please check your email for the password reset link.",
          });
        }
      }
    );

    return () => {
      isMounted = false;
      data?.subscription.unsubscribe();
    };
  }, [navigate, hasRedirected, toast]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Effects */}
      <Hero className="absolute inset-0 -z-10" gradient blur />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl animate-pulse top-[-250px] left-[-200px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl animate-pulse bottom-[-200px] right-[-150px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Title Section with 3D Effect */}
        <div className="text-center mb-8 perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative transform-gpu"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-2">
              Welcome to
            </h1>
            <div className="relative">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                VIT AP Study Hub
              </h1>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl" />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-300 mt-4"
          >
            Your Gateway to Academic Excellence
          </motion.p>
        </div>

        {/* Email Confirmation Message */}
        <AnimatePresence>
          {showEmailConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
                exit: { duration: 0.3 }
              }}
              className="mb-6"
            >
              <div className="backdrop-blur-xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl border border-green-400/30 shadow-[0_8px_32px_0_rgba(34,197,94,0.2)] p-6">
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="flex-shrink-0"
                  >
                    <Mail className="h-6 w-6 text-green-400" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-lg font-semibold text-green-300 mb-2"
                    >
                      Check Your Email!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-white/90 text-sm mb-3"
                    >
                      We've sent a confirmation link to your email address. Click the link to complete your registration.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex items-center space-x-2 text-yellow-300"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-xs">
                        Don't see the email? Check your spam/junk folder or wait a few minutes.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden"
        >
          {/* Error Message */}
          {errorMessage && (
            <div className="p-4">
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-white">
                  {errorMessage}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Auth UI */}
          <div className="p-6">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "rgb(255, 255, 255, 0.1)",
                      brandAccent: "rgb(255, 255, 255, 0.2)",
                      brandButtonText: "white",
                      defaultButtonBackground: "rgb(255, 255, 255, 0.1)",
                      defaultButtonBackgroundHover: "rgb(255, 255, 255, 0.2)",
                      defaultButtonBorder: "rgb(255, 255, 255, 0.1)",
                      defaultButtonText: "white",
                      dividerBackground: "rgb(255, 255, 255, 0.1)",
                      inputBackground: "rgb(255, 255, 255, 0.05)",
                      inputBorder: "rgb(255, 255, 255, 0.1)",
                      inputBorderHover: "rgb(255, 255, 255, 0.2)",
                      inputBorderFocus: "rgb(255, 255, 255, 0.3)",
                      inputText: "white",
                      inputPlaceholder: "rgb(255, 255, 255, 0.5)",
                      messageText: "white",
                      messageTextDanger: "rgb(239, 68, 68)",
                      messageBackground: "rgb(255, 255, 255, 0.1)",
                      messageBorder: "rgb(255, 255, 255, 0.2)",
                    },
                    space: {
                      buttonPadding: "15px 25px",
                      inputPadding: "15px",
                    },
                    borderWidths: {
                      buttonBorderWidth: "1px",
                      inputBorderWidth: "1px",
                    },
                    radii: {
                      borderRadiusButton: "12px",
                      buttonBorderRadius: "12px",
                      inputBorderRadius: "12px",
                    },
                    fontSizes: {
                      baseBodySize: "14px",
                      baseInputSize: "14px",
                      baseLabelSize: "14px",
                      baseButtonSize: "14px",
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(10px)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "600",
                  },
                  input: {
                    backdropFilter: "blur(10px)",
                  },
                  anchor: {
                    color: "rgb(255, 255, 255, 0.7)",
                    transition: "color 0.2s ease",
                  },
                  label: {
                    color: "rgb(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    marginBottom: "8px",
                  },
                  message: {
                    color: "white",
                    backgroundColor: "rgb(255, 255, 255, 0.1)",
                    border: "1px solid rgb(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    backdropFilter: "blur(10px)",
                  },
                },
              }}
              providers={[]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
