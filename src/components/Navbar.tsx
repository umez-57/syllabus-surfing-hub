import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { StickyNote, Calendar } from "lucide-react"; // Added Calendar icon
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
          duration: 3000,
        });
      } else if (event === 'SIGNED_OUT') {
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
    navigate('/');
  };

  return (
    <nav className="bg-primary w-full py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-white text-2xl font-bold">VIT AP</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            {/* Timetable Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-primary/80"
                  onClick={() => navigate("/timetable")}
                >
                  <Calendar className="mr-2" />
                  Timetable
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage your Timetable</p>
              </TooltipContent>
            </Tooltip>

            {/* Notes Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-primary/80"
                  onClick={() => navigate("/notes")}
                >
                  <StickyNote className="mr-2" />
                  Notes
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-primary/80"
            onClick={() => navigate("/pyq")}
          >
            PYQ
          </Button>
          {isAuthenticated ? (
            <Button
              variant="secondary"
              className="hover:bg-white/90"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="hover:bg-white/90"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
