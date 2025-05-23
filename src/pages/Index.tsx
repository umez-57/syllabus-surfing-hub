
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, BookOpen, FileText, HelpCircle, LogIn } from "lucide-react";
import { FloatingShapes } from "@/components/FloatingShapes";
import { DepartmentPicker } from "@/components/DepartmentPicker";
import { StudyCard } from "@/components/StudyCard";
import { HowItWorks } from "@/components/HowItWorks";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Mock data for study materials
const mockStudyMaterials = [
  {
    id: '1',
    title: 'Data Structures and Algorithms Complete Syllabus',
    department: 'SCOPE',
    semester: '3',
    type: 'syllabus' as const,
    downloadCount: 156,
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'Machine Learning Comprehensive Notes',
    department: 'SCOPE',
    semester: '6',
    type: 'notes' as const,
    downloadCount: 89,
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    title: 'Database Management Systems PYQ Collection',
    department: 'SCOPE',
    semester: '4',
    type: 'pyq' as const,
    downloadCount: 234,
    lastUpdated: '3 days ago'
  },
  {
    id: '4',
    title: 'Digital Electronics Fundamentals',
    department: 'SENSE',
    semester: '2',
    type: 'syllabus' as const,
    downloadCount: 67,
    lastUpdated: '5 days ago'
  },
  {
    id: '5',
    title: 'Thermodynamics Study Guide',
    department: 'SENSE',
    semester: '3',
    type: 'notes' as const,
    downloadCount: 45,
    lastUpdated: '1 week ago'
  },
  {
    id: '6',
    title: 'Circuit Analysis Previous Papers',
    department: 'SENSE',
    semester: '2',
    type: 'pyq' as const,
    downloadCount: 123,
    lastUpdated: '4 days ago'
  }
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter materials based on search and department
  const filteredMaterials = mockStudyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !selectedDepartment || material.department === selectedDepartment.toUpperCase();
    return matchesSearch && matchesDepartment;
  });

  const handleDownload = (id: string) => {
    console.log('Downloading material:', id);
    // Implement download logic
  };

  const handlePreview = (id: string) => {
    console.log('Previewing material:', id);
    // Implement preview logic
  };

  return (
    <div className="min-h-screen galaxy-bg relative overflow-x-hidden">
      <FloatingShapes />
      
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-lg border-b-4 border-black">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-display font-bold text-white">
              VIT-AP <span className="text-accent">Hub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/notes')} className="text-white hover:text-accent transition-colors font-medium">
                Notes
              </button>
              <button onClick={() => navigate('/pyq')} className="text-white hover:text-accent transition-colors font-medium">
                PYQ
              </button>
              <button onClick={() => navigate('/guide')} className="text-white hover:text-accent transition-colors font-medium">
                Guide
              </button>
              <button onClick={() => navigate('/login')} className="brutalist-btn">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-black/40 backdrop-blur-lg border-4 border-black p-4 space-y-4">
              <button onClick={() => navigate('/notes')} className="block text-white hover:text-accent transition-colors font-medium">
                Notes
              </button>
              <button onClick={() => navigate('/pyq')} className="block text-white hover:text-accent transition-colors font-medium">
                PYQ
              </button>
              <button onClick={() => navigate('/guide')} className="block text-white hover:text-accent transition-colors font-medium">
                Guide
              </button>
              <button onClick={() => navigate('/login')} className="brutalist-btn w-full">
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight mb-8">
            Academic <span className="text-accent">Clarity</span>
            <br />
            <span className="text-4xl md:text-6xl">at VIT-AP</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your gateway to comprehensive study materials, previous year questions, and academic resources
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for syllabi, notes, PYQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full brutalist-input pr-16"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-black p-3 border-2 border-black">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Department Picker */}
      <section className="relative z-10 pb-16">
        <div className="container mx-auto px-6">
          <DepartmentPicker
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
        </div>
      </section>

      {/* Study Materials Grid */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
            Featured Study Materials
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material, index) => (
              <StudyCard
                key={material.id}
                title={material.title}
                department={material.department}
                semester={material.semester}
                type={material.type}
                downloadCount={material.downloadCount}
                lastUpdated={material.lastUpdated}
                onDownload={() => handleDownload(material.id)}
                onPreview={() => handlePreview(material.id)}
                index={index}
              />
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-16">
              <div className="brutalist-card inline-block">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No materials found</h3>
                <p className="text-gray-600">Try adjusting your search or department filter</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-lg border-t-4 border-black">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                VIT-AP <span className="text-accent">Hub</span>
              </h3>
              <p className="text-white/70 leading-relaxed">
                Empowering students with comprehensive academic resources and study materials.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/notes')} className="block text-white/70 hover:text-accent transition-colors">
                  Notes
                </button>
                <button onClick={() => navigate('/pyq')} className="block text-white/70 hover:text-accent transition-colors">
                  Previous Year Questions
                </button>
                <button onClick={() => navigate('/guide')} className="block text-white/70 hover:text-accent transition-colors">
                  Study Guide
                </button>
              </div>
            </div>

            {/* Departments */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Departments</h4>
              <div className="space-y-2 text-sm">
                {['SCOPE', 'SENSE', 'SPEC', 'SELECT'].map(dept => (
                  <div key={dept} className="text-white/70">{dept}</div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Support</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/privacy-policy')} className="block text-white/70 hover:text-accent transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => navigate('/terms-of-service')} className="block text-white/70 hover:text-accent transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/50">
              © {new Date().getFullYear()} VIT-AP Study Hub. All rights reserved.
            </p>
            <div className="mt-2">
              <button 
                onClick={() => navigate('/adminpanelumez')} 
                className="text-xs text-white/30 hover:text-accent transition-colors"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </footer>

      <SpeedInsights />
    </div>
  );
}
