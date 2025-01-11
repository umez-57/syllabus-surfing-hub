import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-primary w-full py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-white text-2xl font-bold">VIT AP</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-primary/80"
            onClick={() => navigate("/scope")}
          >
            SCOPE
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-primary/80"
            onClick={() => navigate("/pyq")}
          >
            PYQ
          </Button>
          <Button
            variant="secondary"
            className="hover:bg-white/90"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};