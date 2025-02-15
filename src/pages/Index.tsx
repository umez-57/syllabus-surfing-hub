import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";

const Index = () => {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            VIT Syllabus Hub
          </h1>
          <p className="text-xl text-gray-600">
            Your gateway to academic clarity at VIT AP
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Currently featuring SCOPE syllabi. Other departments coming soon!
          </p>
        </div>

        <SearchBar />
      </div>
    </div>
  );
};

export default Index;
