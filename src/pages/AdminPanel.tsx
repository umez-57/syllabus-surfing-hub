import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileManagement } from "@/components/admin/FileManagement";
import { Analytics } from "@/components/admin/Analytics";

const AdminPanel = () => {
  const [activeView, setActiveView] = useState<'files' | 'analytics'>('files');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="flex gap-4 mb-8">
        <Button 
          variant={activeView === 'files' ? "default" : "outline"}
          onClick={() => setActiveView('files')}
          className="flex-1 max-w-xs"
        >
          Manage Files
        </Button>
        <Button 
          variant={activeView === 'analytics' ? "default" : "outline"}
          onClick={() => setActiveView('analytics')}
          className="flex-1 max-w-xs"
        >
          View Analytics
        </Button>
      </div>

      {activeView === 'files' ? <FileManagement /> : <Analytics />}
    </div>
  );
};

export default AdminPanel;