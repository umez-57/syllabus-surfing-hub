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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* logo - keeping this unchanged */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/home")}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">🎓</span>
              </div>
              <div className="text-white">
                <span className="font-bold text-xl">VIT AP</span>
                <br />
                <span className="text-sm text-slate-300">Study Hub</span>
              </div>
            </div>
          </div>

          {/* mobile hamburger */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-slate-800"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <TooltipProvider>
              {/* Mock Course Registration – disabled */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200"
                    onClick={upcomingToast}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
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
                      className="text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
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
                    className="text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200"
                    onClick={() => navigate("/notes")}
                  >
                    <StickyNote className="mr-2 h-4 w-4" />
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
              className="text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200"
              onClick={() => navigate("/pyq")}
            >
              <Archive className="mr-2 h-4 w-4" />
              PYQ
            </Button>

            {/* auth buttons */}
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="ml-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                className="ml-4 bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* mobile dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md rounded-lg border border-slate-700/50 mt-2 mb-4">
            <div className="px-4 py-3 space-y-1">
              <TooltipProvider>
                {/* Mock Course Registration – disabled (mobile) */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-white hover:bg-slate-700 w-full justify-start rounded-lg"
                      onClick={upcomingToast}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
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
                        className="text-slate-300 hover:text-white hover:bg-slate-700 w-full justify-start rounded-lg"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
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
                      className="text-slate-300 hover:text-white hover:bg-slate-700 w-full justify-start rounded-lg"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/notes");
                      }}
                    >
                      <StickyNote className="mr-2 h-4 w-4" />
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
                className="text-slate-300 hover:text-white hover:bg-slate-700 w-full justify-start rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/pyq");
                }}
              >
                <Archive className="mr-2 h-4 w-4" />
                PYQ
              </Button>

              {/* auth buttons */}
              <div className="pt-2 border-t border-slate-700/50 mt-2">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 w-full justify-start rounded-lg"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 w-full justify-start rounded-lg"
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
          </div>
        )}
      </div>
    </nav>
  );
};
