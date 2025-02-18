import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import {
  StickyNote,
  Calendar,
  BookOpen,
  ShieldCheck,
  FileText,
  Menu,
  X
} from "lucide-react"; // We'll use Menu (hamburger) and X (close) icons
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

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-primary w-full px-6 py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 h-[70px]">
          <a href="." className="flex items-center">
            <img
              src="/vit.png"
              alt="VIT Logo"
              className="h-[120px] w-auto object-cover md:h-[150px]"
            />
            {/*
            If you want a text label:
            <span className="text-white text-xl font-semibold ml-2">
              VIT AP Study Hub
            </span>
            */}
          </a>
        </div>

        {/* Desktop Menu Toggle Button (Visible only on mobile) */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-primary/80 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Main Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <TooltipProvider>
            {/* Mock Course Registration */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://vitapmockcourseregistration.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" className="text-white hover:bg-primary/80">
                    <BookOpen className="mr-2" />
                    Mock Course <br /> Registration
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mock Course Registration</p>
              </TooltipContent>
            </Tooltip>

            {/* Timetable Scheduler */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://vitaptimetablescheduler.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" className="text-white hover:bg-primary/80">
                    <Calendar className="mr-2" />
                    Timetable <br /> Scheduler
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
                  className="text-white hover:bg-primary/80"
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

            {/* Privacy Policy */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-primary/80"
                  onClick={() => navigate("/privacy-policy")}
                >
                  <ShieldCheck className="mr-2" />
                  Privacy Policy
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View our Privacy Policy</p>
              </TooltipContent>
            </Tooltip>

            {/* Terms of Service */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-primary/80"
                  onClick={() => navigate("/terms-of-service")}
                >
                  <FileText className="mr-2" />
                  Terms of Service
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View our Terms of Service</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* PYQ Button */}
          <Button
            variant="ghost"
            className="text-white hover:bg-primary/80"
            onClick={() => navigate("/pyq")}
          >
            PYQ
          </Button>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <Button variant="secondary" className="hover:bg-white/90" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button variant="secondary" className="hover:bg-white/90" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary">
          <div className="px-6 py-3 space-y-2">
            <TooltipProvider>
              {/* Mock Course Registration */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://vitapmockcourseregistration.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-primary/80 w-full justify-start"
                    >
                      <BookOpen className="mr-2" />
                      Mock Course Registration
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mock Course Registration</p>
                </TooltipContent>
              </Tooltip>

              {/* Timetable Scheduler */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://vitaptimetablescheduler.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-primary/80 w-full justify-start"
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
                    className="text-white hover:bg-primary/80 w-full justify-start"
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

              {/* Privacy Policy */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-primary/80 w-full justify-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/privacy-policy");
                    }}
                  >
                    <ShieldCheck className="mr-2" />
                    Privacy Policy
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View our Privacy Policy</p>
                </TooltipContent>
              </Tooltip>

              {/* Terms of Service */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-primary/80 w-full justify-start"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate("/terms-of-service");
                    }}
                  >
                    <FileText className="mr-2" />
                    Terms of Service
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View our Terms of Service</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* PYQ Button */}
            <Button
              variant="ghost"
              className="text-white hover:bg-primary/80 w-full justify-start"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/pyq");
              }}
            >
              PYQ
            </Button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Button
                variant="secondary"
                className="hover:bg-white/90 w-full justify-start"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="hover:bg-white/90 w-full justify-start"
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
    </nav>
  );
};
