import { SearchBar } from "@/components/SearchBar";
import { SyllabusCard } from "@/components/SyllabusCard";

const SAMPLE_SYLLABI = [
  {
    title: "Data Structures and Algorithms",
    code: "CSE2001",
    description: "Fundamental course covering various data structures and algorithmic approaches to problem-solving.",
    credits: 4,
  },
  {
    title: "Database Management Systems",
    code: "CSE2002",
    description: "Comprehensive study of database concepts, design, and implementation.",
    credits: 3,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            VIT Syllabus Hub
          </h1>
          <p className="text-xl text-gray-600">
            Your gateway to academic clarity at VIT AP
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_SYLLABI.map((syllabus) => (
            <SyllabusCard key={syllabus.code} {...syllabus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;