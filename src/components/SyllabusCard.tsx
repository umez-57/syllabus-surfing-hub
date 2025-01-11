import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface SyllabusCardProps {
  title: string;
  code: string;
  description: string;
  credits: number;
}

export const SyllabusCard = ({ title, code, description, credits }: SyllabusCardProps) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authAction, setAuthAction] = useState<"share" | "download">("download");

  const handleAuthAction = (action: "share" | "download") => {
    const session = supabase.auth.getSession();
    if (!session) {
      setAuthAction(action);
      setShowAuthDialog(true);
      return;
    }
    
    if (action === "share") {
      handleShare();
    } else {
      handleDownload();
    }
  };

  const handleShare = () => {
    // Share functionality will be implemented later
    console.log("Share clicked");
  };

  const handleDownload = () => {
    // Download functionality will be implemented later
    console.log("Download clicked");
  };

  return (
    <>
      <Card className="w-full max-w-md animate-fadeIn hover:shadow-lg transition-all border-red-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
          <CardDescription>Course Code: {code} | Credits: {credits}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => handleAuthAction("share")} 
            className="border-primary/20 hover:bg-primary/5"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button 
            onClick={() => handleAuthAction("download")} 
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to {authAction === "share" ? "share" : "download"}</DialogTitle>
            <DialogDescription>
              Please sign in or create an account to {authAction} this syllabus.
            </DialogDescription>
          </DialogHeader>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "rgb(234, 56, 76)",
                    brandAccent: "rgba(234, 56, 76, 0.8)",
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
        </DialogContent>
      </Dialog>
    </>
  );
};