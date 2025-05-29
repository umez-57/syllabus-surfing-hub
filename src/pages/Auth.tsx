
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
import { Mail, AlertTriangle } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

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

        console.log("Auth state change:", event, session?.user?.email);

        if (event === "SIGNED_IN" && session) {
          await handleRedirection(session);
        } else if (event === "SIGNED_OUT") {
          setHasRedirected(false);
          navigate("/login", { replace: true });
        } else if (event === "PASSWORD_RECOVERY") {
          toast({
            variant: "success",
            title: "Password Reset Email Sent",
            description: "Please check your email for the password reset link.",
          });
        } else if (event === "SIGNED_UP") {
          console.log("Sign up detected via auth state change");
          setShowConfirmationMessage(true);
          setErrorMessage("");
        }
      }
    );

    return () => {
      isMounted = false;
      data?.subscription.unsubscribe();
    };
  }, [navigate, hasRedirected, toast]);

  // Enhanced signup detection with multiple methods
  useEffect(() => {
    let signupDetectionTimer: NodeJS.Timeout;
    let mutationObserver: MutationObserver;

    const detectSignupSubmission = () => {
      console.log("Signup submission detected!");
      setShowConfirmationMessage(true);
      setErrorMessage("");
      
      // Hide any existing Supabase messages
      const hideSupabaseMessages = () => {
        const messages = document.querySelectorAll('[data-supabase-auth-ui] .supabase-auth-ui_ui-message');
        messages.forEach(msg => {
          const element = msg as HTMLElement;
          element.style.display = 'none';
        });
      };
      
      setTimeout(hideSupabaseMessages, 100);
      setTimeout(hideSupabaseMessages, 500);
    };

    // Method 1: Form submission detection
    const handleFormSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement;
      if (target && target.closest('[data-supabase-auth-ui]')) {
        const formData = new FormData(target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Check if this looks like a signup (has email and password)
        if (email && password) {
          const submitButton = target.querySelector('button[type="submit"]');
          const buttonText = submitButton?.textContent?.toLowerCase() || '';
          
          console.log("Form submit detected, button text:", buttonText);
          
          // Detect signup based on button text or form action
          if (buttonText.includes('sign up') || buttonText.includes('create') || buttonText.includes('register')) {
            signupDetectionTimer = setTimeout(detectSignupSubmission, 500);
          }
        }
      }
    };

    // Method 2: Button click detection
    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.closest('[data-supabase-auth-ui]')) {
        const buttonText = target.textContent?.toLowerCase() || '';
        
        console.log("Button click detected, text:", buttonText);
        
        if (buttonText.includes('sign up') || buttonText.includes('create') || buttonText.includes('register')) {
          // Check if form has valid data
          const form = target.closest('form');
          if (form) {
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            
            if (email && password) {
              signupDetectionTimer = setTimeout(detectSignupSubmission, 800);
            }
          }
        }
      }
    };

    // Method 3: DOM mutation observer for Supabase messages
    const setupMutationObserver = () => {
      const authContainer = document.querySelector('[data-supabase-auth-ui]');
      if (!authContainer) return;

      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check for Supabase confirmation messages
              if (element.classList?.contains('supabase-auth-ui_ui-message') || 
                  element.querySelector?.('.supabase-auth-ui_ui-message')) {
                
                const messageText = element.textContent?.toLowerCase() || '';
                console.log("Supabase message detected:", messageText);
                
                if (messageText.includes('check your email') || 
                    messageText.includes('confirmation') ||
                    messageText.includes('verify')) {
                  
                  console.log("Email confirmation message detected, showing custom message");
                  detectSignupSubmission();
                  
                  // Hide the Supabase message
                  setTimeout(() => {
                    if (element.parentNode) {
                      (element as HTMLElement).style.display = 'none';
                    }
                  }, 100);
                }
              }
            }
          });
        });
      });

      mutationObserver.observe(authContainer, {
        childList: true,
        subtree: true
      });
    };

    // Initialize detection methods
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('click', handleButtonClick);
    
    // Setup mutation observer after a short delay to ensure Auth UI is rendered
    setTimeout(setupMutationObserver, 1000);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleButtonClick);
      if (signupDetectionTimer) clearTimeout(signupDetectionTimer);
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  // Auto-hide confirmation message after 30 seconds
  useEffect(() => {
    if (showConfirmationMessage) {
      const timer = setTimeout(() => {
        setShowConfirmationMessage(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmationMessage]);

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

        {/* Enhanced Animated Confirmation Message */}
        <AnimatePresence>
          {showConfirmationMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.6
              }}
              className="mb-6 relative z-20"
            >
              <div className="relative">
                {/* Enhanced background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 blur-2xl rounded-2xl animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 blur-xl rounded-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Main message container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-r from-green-500/15 via-emerald-500/15 to-teal-500/15 rounded-2xl border border-green-400/40 shadow-[0_0_40px_rgba(34,197,94,0.4)] p-6">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="flex-shrink-0"
                    >
                      <Mail className="h-7 w-7 text-green-400 drop-shadow-lg" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-xl font-bold text-green-300 mb-3 drop-shadow-lg"
                      >
                        Check your email for the confirmation link
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-start space-x-2 text-sm text-green-200/95"
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5 drop-shadow-lg" />
                        </motion.div>
                        <p className="leading-relaxed">
                          If you don't see the email in your inbox, please check your <strong className="text-yellow-300">spam/junk folder</strong> as emails sometimes end up there.
                        </p>
                      </motion.div>
                      
                      {/* Dismiss button */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        onClick={() => setShowConfirmationMessage(false)}
                        className="mt-4 text-xs text-green-300/70 hover:text-green-300 transition-colors underline decoration-green-400/50 hover:decoration-green-400"
                      >
                        Dismiss message
                      </motion.button>
                    </div>
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
          <div className="p-6" data-supabase-auth-ui>
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
