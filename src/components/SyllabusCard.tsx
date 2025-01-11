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

interface SyllabusCardProps {
  title: string;
  code: string;
  description: string;
  credits: number;
}

export const SyllabusCard = ({ title, code, description, credits }: SyllabusCardProps) => {
  const handleShare = () => {
    // Share functionality will be implemented later
    console.log("Share clicked");
  };

  const handleDownload = () => {
    // Download functionality will be implemented later
    console.log("Download clicked");
  };

  return (
    <Card className="w-full max-w-md animate-fadeIn hover:shadow-lg transition-all border-red-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
        <CardDescription>Course Code: {code} | Credits: {credits}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleShare} className="border-primary/20 hover:bg-primary/5">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};