
import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "@/components/hero";
import { NotesSearchBar } from "@/components/NotesSearchBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Folder from "@/components/Folder";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";

export function NotesHome() {
  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE", fn: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE", fn: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS",   fn: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB",   fn: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH",  fn: "VISH (Humanities)" },
  ];

  const location = useLocation();
  const navigate  = useNavigate();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const sharedIdQS = query.get("shared") ?? "";
  const deptQS = query.get("dept") ?? "";

  const [selectedDept, setSelectedDept] = useState<string>(() =>
    departments.some((d) => d.id === deptQS) ? deptQS : ""
  );

  useEffect(() => {
    const p = new URLSearchParams();
    if (selectedDept) p.set("dept", selectedDept);
    if (sharedIdQS)  p.set("shared", sharedIdQS);
    navigate(`/notes?${p.toString()}`, { replace: true });
  }, [selectedDept, sharedIdQS, navigate]);

  const selectedDepartment = departments.find((d) => d.id === selectedDept);

  return (
    <BeamsBackground intensity="medium" className="min-h-screen overflow-hidden">
      <Navbar />

      <main className="relative z-10 pt-20">
        {!selectedDept ? (
          <section className="container mx-auto px-4 py-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-7xl mx-auto"
            >
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
              >
                Select Your Department For Notes
              </motion.h1>

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
                          onClick={() => setSelectedDept(dept.id)}
                        >
                          <p className="font-semibold">{dept.name}</p>
                        </div>
                      }
                    />
                    <p className="mt-4 font-semibold text-white/80 group-hover:text-white transition-colors">
                      {dept.fn ?? dept.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        ) : (
          <section className="container mx-auto px-4 py-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-7xl mx-auto mb-16"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
                >
                  Notes for {selectedDepartment?.fn ?? selectedDepartment?.name ?? "Department"}
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
                <NotesSearchBar department_id={selectedDept} />
              </motion.div>
            </motion.div>
          </section>
        )}
      </main>

      <Footer />
    </BeamsBackground>
  );
}
