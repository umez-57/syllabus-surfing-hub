// src/pages/NotesHome.tsx
import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hero } from "@/components/hero";
import { NotesSearchBar } from "@/components/NotesSearchBar";
import { Navbar } from "@/components/Navbar";
import Folder from "@/components/Folder";

export function NotesHome() {
  /* department list */
  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE", fn: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE", fn: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS",   fn: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB",   fn: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH",  fn: "VISH (Humanities)" },
  ];

  /* ─── query-string helpers ─── */
  const location = useLocation();
  const navigate  = useNavigate();

  const query      = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const sharedIdQS = query.get("shared") ?? "";
  const deptQS     = query.get("dept") ?? "";

  /* selected department (default = dept from URL, if valid) */
  const [selectedDept, setSelectedDept] = useState<string>(() =>
    departments.some((d) => d.id === deptQS) ? deptQS : ""
  );

  /* whenever user picks a dept, sync URL (preserve shared param if present) */
  useEffect(() => {
    const p = new URLSearchParams();
    if (selectedDept) p.set("dept", selectedDept);
    if (sharedIdQS)  p.set("shared", sharedIdQS);
    navigate(`/notes?${p.toString()}`, { replace: true });
  }, [selectedDept, sharedIdQS, navigate]);

  /* ─── UI ─── */
  return (
    <div className="relative min-h-screen">
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      {!selectedDept ? (
        /* ------------------------------------------------------------------ */
        /* department picker                                                  */
        /* ------------------------------------------------------------------ */
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Select Your Department For Notes
          </h1>
          <br /><br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {departments.map((dept) => (
              <div key={dept.id} className="flex flex-col items-center">
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
                <br />
                <p className="font-semibold text-white">{dept.fn}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------------ */
        /* notes list for chosen dept                                         */
        /* ------------------------------------------------------------------ */
        <div className="container mx-auto p-4 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Notes for {departments.find((d) => d.id === selectedDept)?.fn}
          </h1>
          <p
            className="text-blue-400 cursor-pointer mb-6"
            onClick={() => setSelectedDept("")}
          >
            &larr; Change Department
          </p>

          {/* pass selectedDept; NotesSearchBar already reads ?shared */}
          <NotesSearchBar department_id={selectedDept} />
        </div>
      )}
    </div>
  );
}
