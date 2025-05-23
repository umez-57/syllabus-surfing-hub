
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

/* icons */
import {
  StickyNote,
  Calendar,
  BookOpen,
  Menu,
  X,
  Archive,
  User,
  LogOut,
} from "lucide-react";

/* UI primitives */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  /* ───────── auth listener ───────── */
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);

      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
          duration: 3000,
        });
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Goodbye!",
          description: "You have been signed out.",
          duration: 3000,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ───────── helpers ───────── */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);

  /* toast used for the disabled feature */
  const upcomingToast = () =>
    toast({
      title: "Coming soon!",
      description:
        "This feature will be available before course registration – stay tuned!",
      duration: 4000,
    });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl border-b border-white/10" />
      
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <a href="/" className="flex items-center">
              <img
                src="/vit.png"
                alt="VIT Logo"
                className="h-12 w-auto object-cover"
              />
            </a>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 px-4 py-2 opacity-60"
                      onClick={upcomingToast}
                    >
                      <BookOpen className="mr-2 w-4 h-4" />
                      <span className="text-sm font-medium">Mock Course Registration</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon!</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 px-4 py-2"
                      onClick={() => window.open("https://timetable.vitaphub.in/", "_blank")}
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      <span className="text-sm font-medium">Timetable Scheduler</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage your Timetable</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 px-4 py-2"
                      onClick={() => navigate("/notes")}
                    >
                      <StickyNote className="mr-2 w-4 h-4" />
                      <span className="text-sm font-medium">Notes</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Notes</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 px-4 py-2"
                      onClick={() => navigate("/pyq")}
                    >
                      <Archive className="mr-2 w-4 h-4" />
                      <span className="text-sm font-medium">PYQ</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Previous Year Questions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Auth Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="ml-4"
            >
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <User className="w-4 h-4 text-white/70" />
                    <span className="text-sm text-white/70 max-w-32 truncate">
                      {userEmail}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 rounded-xl px-4 py-2 transition-all duration-300 hover:scale-105"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 rounded-xl px-6 py-2 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 backdrop-blur-lg p-3 rounded-xl border border-white/10"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-4">
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 w-full justify-start rounded-xl opacity-60"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        upcomingToast();
                      }}
                    >
                      <BookOpen className="mr-3 w-4 h-4" />
                      Mock Course Registration
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 w-full justify-start rounded-xl"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.open("https://timetable.vitaphub.in/", "_blank");
                      }}
                    >
                      <Calendar className="mr-3 w-4 h-4" />
                      Timetable Scheduler
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 w-full justify-start rounded-xl"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/notes");
                      }}
                    >
                      <StickyNote className="mr-3 w-4 h-4" />
                      Notes
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 w-full justify-start rounded-xl"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/pyq");
                      }}
                    >
                      <Archive className="mr-3 w-4 h-4" />
                      PYQ
                    </Button>
                  </motion.div>
                  
                  {/* Mobile Auth */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-3 border-t border-white/10"
                  >
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
                          <User className="w-4 h-4 text-white/70" />
                          <span className="text-sm text-white/70 truncate">
                            {userEmail}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white w-full justify-start rounded-xl"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleSignOut();
                          }}
                        >
                          <LogOut className="mr-3 w-4 h-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white w-full justify-start rounded-xl"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/login");
                        }}
                      >
                        <User className="mr-3 w-4 h-4" />
                        Login
                      </Button>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
