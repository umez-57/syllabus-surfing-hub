import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PyqSearchBar } from "@/components/PyqSearchBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Folder from "@/components/Folder";
import { Hero } from "@/components/hero";
import { motion } from "framer-motion";

export function PyqHome() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const { search } = useLocation();
  const navigate = useNavigate();

  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE", fn: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE", fn: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS", fn: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB", fn: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH", fn: "VISH (Humanities)" },
  ];

  useEffect(() => {
    const params = new URLSearchParams(search);
    const dept = params.get("dept");
    if (dept && departments.some((d) => d.id === dept)) {
      setSelectedDept(dept);
    }
  }, [search]);

  const chooseDept = (deptId: string) => {
    navigate(`/pyq?dept=${deptId}`, { replace: true });
    setSelectedDept(deptId);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <Hero className="absolute inset-0 -z-10" gradient blur />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl animate-pulse top-[-250px] left-[-200px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl animate-pulse bottom-[-200px] right-[-150px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 pt-36 flex-grow pb-24">
        {!selectedDept ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl"
          >
            <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
              Select Your Department For Previous Year Questions
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
              {departments.map((dept, index) => (
                <motion.div 
                  key={dept.id} 
                  className="flex flex-col items-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Folder
                    size={1.2}
                    item={
                      <div
                        className="p-2 text-center cursor-pointer text-white"
                        onClick={() => chooseDept(dept.id)}
                      >
                        <p className="font-semibold">{dept.name}</p>
                      </div>
                    }
                  />
                  <p className="mt-4 font-semibold text-white/80 group-hover:text-white transition-colors">
                    {dept.fn}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200"
              >
                Previous Year Questions for {departments.find((d) => d.id === selectedDept)?.fn}
              </motion.h1>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                onClick={() => setSelectedDept("")}
              >
                ← Change Department
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <PyqSearchBar department_id={selectedDept} />
            </motion.div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}