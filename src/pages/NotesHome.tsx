// src/pages/NotesHome.tsx

import React, { useState } from "react";
import { Hero } from "@/components/hero";
import { NotesSearchBar } from "@/components/NotesSearchBar";
import { Navbar } from "@/components/Navbar";
import Folder from "@/components/Folder"; // Single-card Folder

export function NotesHome() {
  const [selectedDept, setSelectedDept] = useState<string>("");

  // Department data: short & full names
  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE", fn: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE", fn: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS", fn: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB", fn: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH", fn: "VISH (Humanities)" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero background behind everything */}
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      {/* If no dept chosen, show folder grid; else show the search bar */}
      {!selectedDept ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Select Your Department For Notes
          </h1>
          <br /> <br />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {departments.map((dept) => (
              <div key={dept.id} className="flex flex-col items-center">
                {/* Single folder with one "paper" inside */}
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
        <div className="container mx-auto p-4 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Notes for {departments.find((d) => d.id === selectedDept)?.fn}
          </h1>
          <p
            className="text-blue-500 cursor-pointer mb-6"
            onClick={() => setSelectedDept("")}
          >
            &larr; Change Department
          </p>
          <NotesSearchBar department_id={selectedDept} />
        </div>
      )}
    </div>
  );
}
