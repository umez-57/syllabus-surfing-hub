import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <Input
        type="search"
        placeholder="Search for any subject syllabus..."
        className="pl-10 pr-4 py-6 text-lg rounded-xl border-2 border-accent hover:border-primary/20 transition-all"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
};