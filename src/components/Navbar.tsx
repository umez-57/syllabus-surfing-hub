import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/* icons */
import {
  StickyNote,
  Calendar,
  BookOpen,
  Menu,
  X,
  Archive,
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

  /* ───────── auth listener ───────── */
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);

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

  /* ───────── UI ───────── */
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between h-[70px]">
          {/* logo */}
          <div className="flex items-center">
            <a href="." className="flex items-center">
              <img
                src="/vit.png"
                alt="VIT Logo"
                className="h-[120px] w-auto object-cover md:h-[150px]"
              />
            </a>
          </div>

          {/* mobile hamburger */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white hover:bg-purple-500/20 hover:text-purple-200 backdrop-blur-lg p-2 rounded-lg border border-white/10 transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <TooltipProvider>
              {/* Mock Course Registration – disabled */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-purple-500/20 hover:text-purple-200 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-400/30"
                    onClick={upcomingToast}
                  >
                    <BookOpen className="mr-2" />
                    <span className="flex flex-col items-start leading-4">
                      <span>Mock Course</span>
                      <span>Registration</span>
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon!</p>
                </TooltipContent>
              </Tooltip>

              {/* Timetable Scheduler */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://timetable.vitaphub.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="ghost" 
                      className="text-white hover:bg-purple-500/20 hover:text-purple-200 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-400/30"
                    >
                      <Calendar className="mr-2" />
                      <span className="flex flex-col items-start leading-4">
                        <span>Timetable</span>
                        <span>Scheduler</span>
                      </span>
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage your Timetable</p>
                </TooltipContent>
              </Tooltip>

              {/* Notes */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-purple-500/20 hover:text-purple-200 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-400/30"
                    onClick={() => navigate("/notes")}
                  >
                    <StickyNote className="mr-2" />
                    Notes
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Notes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* PYQ */}
            <Button
              variant="ghost"
              className="text-white hover:bg-purple-500/20 hover:text-purple-200 backdrop-blur-lg rounded-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-purple-400/30"
              onClick={() => navigate("/pyq")}
            >
              <Archive className="mr-2" />
              PYQ
            </Button>

            {/* auth buttons */}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="bg-white/90 text-gray-800 hover:bg-white hover:text-black backdrop-blur-lg rounded-lg border border-white/50 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="bg-white/90 text-gray-800 hover:bg-white hover:text-black backdrop-blur-lg rounded-lg border border-white/50 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* mobile dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-lg rounded-lg border border-white/10 mt-2">
            <div className="px-6 py-3 space-y-2">
              <TooltipProvider>
                {/* Mock Course Registration – disabled (mobile) */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500/20 hover:text-purple-200 w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300"
                      onClick={upcomingToast}
                    >
                      <BookOpen className="mr-2" />
                      Mock Course Registration
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon!</p>
                  </TooltipContent>
                </Tooltip>

                {/* Timetable Scheduler */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://timetable.vitaphub.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-purple-500/20 hover:text-purple-200 w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300"
                      >
                        <Calendar className="mr-2" />
                        Timetable Scheduler
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Manage your Timetable</p>
                  </TooltipContent>
                </Tooltip>

                {/* Notes */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500/20 hover:text-purple-200 w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/notes");
                      }}
                    >
                      <StickyNote className="mr-2" />
                      Notes
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Notes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* PYQ */}
              <Button
                variant="ghost"
                className="text-white hover:bg-purple-500/20 hover:text-purple-200 w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/pyq");
                }}
              >
                <Archive className="mr-2" />
                PYQ
              </Button>

              {/* auth buttons */}
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="bg-white/90 text-gray-800 hover:bg-white hover:text-black w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300 font-medium shadow-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="bg-white/90 text-gray-800 hover:bg-white hover:text-black w-full justify-start rounded-lg backdrop-blur-lg transition-all duration-300 font-medium shadow-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
