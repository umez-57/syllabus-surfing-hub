import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertTriangle, Sparkles, Zap, Shield } from "lucide-react";

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

    const handleFormSubmit = (event: Event) => {
      const target = event.target as HTMLFormElement;
      if (target && target.closest('[data-supabase-auth-ui]')) {
        const formData = new FormData(target);
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (email && password) {
          const submitButton = target.querySelector('button[type="submit"]');
          const buttonText = submitButton?.textContent?.toLowerCase() || '';
          
          console.log("Form submit detected, button text:", buttonText);
          
          if (buttonText.includes('sign up') || buttonText.includes('create') || buttonText.includes('register')) {
            signupDetectionTimer = setTimeout(detectSignupSubmission, 500);
          }
        }
      }
    };

    const handleButtonClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.closest('[data-supabase-auth-ui]')) {
        const buttonText = target.textContent?.toLowerCase() || '';
        
        console.log("Button click detected, text:", buttonText);
        
        if (buttonText.includes('sign up') || buttonText.includes('create') || buttonText.includes('register')) {
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

    const setupMutationObserver = () => {
      const authContainer = document.querySelector('[data-supabase-auth-ui]');
      if (!authContainer) return;

      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              if (element.classList?.contains('supabase-auth-ui_ui-message') || 
                  element.querySelector?.('.supabase-auth-ui_ui-message')) {
                
                const messageText = element.textContent?.toLowerCase() || '';
                console.log("Supabase message detected:", messageText);
                
                if (messageText.includes('check your email') || 
                    messageText.includes('confirmation') ||
                    messageText.includes('verify')) {
                  
                  console.log("Email confirmation message detected, showing custom message");
                  detectSignupSubmission();
                  
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

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('click', handleButtonClick);
    
    setTimeout(setupMutationObserver, 1000);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleButtonClick);
      if (signupDetectionTimer) clearTimeout(signupDetectionTimer);
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Glassmorphic Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_50%)]" />
      
      {/* Floating Glassmorphic Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl backdrop-blur-xl border border-white/10 floating-shape opacity-60" />
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full backdrop-blur-xl border border-white/10 floating-shape opacity-60" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Enhanced Title Section */}
        <div className="text-center mb-8 perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative transform-gpu"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white font-mono font-bold uppercase tracking-wider text-sm"
            >
              <Shield className="w-4 h-4 text-purple-400" />
              <span>Secure Access Portal</span>
            </motion.div>

            {/* Main Heading with Enhanced Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="relative mb-6"
            >
              {/* Welcome Text */}
              <div className="text-2xl md:text-3xl font-light mb-2 tracking-wide">
                <span className="bg-gradient-to-r from-white/90 to-gray-300/90 bg-clip-text text-transparent font-mono">
                  Welcome to
                </span>
              </div>
              
              {/* Main Brand Text with Enhanced Styling */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 text-4xl md:text-5xl font-black tracking-tight blur-sm">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    VIT AP STUDY HUB
                  </span>
                </div>
                
                {/* Main Text */}
                <div className="relative text-4xl md:text-5xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                    VIT AP STUDY HUB
                  </span>
                </div>
                
                {/* Animated Underline */}
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                  className="h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-4 mx-auto"
                />
              </div>
            </motion.h1>

            {/* Subtitle with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative"
            >
              <div className="text-lg md:text-xl font-medium mb-2">
                <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent font-mono">
                  Your Gateway to
                </span>
              </div>
              <div className="text-xl md:text-2xl font-bold">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </div>
            </motion.div>

            {/* Floating Icons */}
            <div className="absolute -top-4 -right-4">
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            </div>
            
            <div className="absolute -bottom-2 -left-4">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  y: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
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
                {/* Main message container */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-2xl p-6">
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
                      <Mail className="h-7 w-7 text-emerald-300" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-xl font-bold mb-3 text-white"
                      >
                        Check your email for the confirmation link
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-start space-x-2 text-sm font-mono"
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
                          <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <p className="leading-relaxed text-white/90">
                          If you don't see the email in your inbox, please check your <strong>spam/junk folder</strong> as emails sometimes end up there.
                        </p>
                      </motion.div>
                      
                      {/* Dismiss button */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        onClick={() => setShowConfirmationMessage(false)}
                        className="mt-4 text-xs text-white/70 hover:text-white transition-colors underline font-mono"
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

        {/* Enhanced Auth Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border border-white/10 rounded-3xl shadow-2xl"
        >
          {/* Error Message */}
          {errorMessage && (
            <div className="p-4">
              <Alert variant="destructive" className="bg-red-500/20 border-red-400/30 backdrop-blur-xl rounded-2xl">
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
                      brand: "rgb(168, 85, 247)",
                      brandAccent: "rgb(236, 72, 153)",
                      brandButtonText: "white",
                      defaultButtonBackground: "rgba(255, 255, 255, 0.05)",
                      defaultButtonBackgroundHover: "rgba(168, 85, 247, 0.2)",
                      defaultButtonBorder: "rgba(255, 255, 255, 0.1)",
                      defaultButtonText: "white",
                      dividerBackground: "rgba(255, 255, 255, 0.1)",
                      inputBackground: "rgba(255, 255, 255, 0.05)",
                      inputBorder: "rgba(255, 255, 255, 0.1)",
                      inputBorderHover: "rgba(168, 85, 247, 0.3)",
                      inputBorderFocus: "rgba(168, 85, 247, 0.5)",
                      inputText: "white",
                      inputPlaceholder: "rgba(255, 255, 255, 0.5)",
                      messageText: "white",
                      messageTextDanger: "rgb(239, 68, 68)",
                      messageBackground: "rgba(0, 0, 0, 0.3)",
                      messageBorder: "rgba(255, 255, 255, 0.1)",
                    },
                    space: {
                      buttonPadding: "16px 24px",
                      inputPadding: "16px",
                    },
                    borderWidths: {
                      buttonBorderWidth: "2px",
                      inputBorderWidth: "2px",
                    },
                    radii: {
                      borderRadiusButton: "12px",
                      buttonBorderRadius: "12px",
                      inputBorderRadius: "12px",
                    },
                    fontSizes: {
                      baseBodySize: "16px",
                      baseInputSize: "16px",
                      baseLabelSize: "14px",
                      baseButtonSize: "16px",
                    },
                  },
                },
                style: {
                  button: {
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    textTransform: "none",
                    letterSpacing: "0.5px",
                    fontWeight: "600",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    background: "linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)",
                      background: "linear-gradient(135deg, rgb(147, 51, 234), rgb(219, 39, 119))",
                    },
                    "&:active": {
                      transform: "translateY(0px)",
                    },
                  },
                  input: {
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: "500",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:focus": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 25px rgba(168, 85, 247, 0.2)",
                    },
                  },
                  anchor: {
                    color: "rgb(34, 211, 238)",
                    transition: "color 0.2s ease",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "&:hover": {
                      color: "rgb(168, 85, 247)",
                    },
                  },
                  label: {
                    color: "white",
                    fontSize: "14px",
                    marginBottom: "8px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                  },
                  message: {
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "12px",
                    fontFamily: "system-ui, -apple-system, sans-serif",
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