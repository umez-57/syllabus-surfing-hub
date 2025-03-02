// src/pages/PyqHome.tsx

import React, { useState } from "react";
import { PyqSearchBar } from "@/components/PyqSearchBar"; // adjust path
import { Navbar } from "@/components/Navbar";            // if you want a nav

export function PyqHome() {
  const [selectedDept, setSelectedDept] = useState<string>("");

  // Same department IDs as in your "notes" pages
  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH (Humanities)" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {!selectedDept ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Select Your Department</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <button
                key={dept.id}
                className="bg-primary text-white p-4 rounded hover:bg-primary/80 transition-all"
                onClick={() => setSelectedDept(dept.id)}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">
            Previous Year Papers for{" "}
            {departments.find((d) => d.id === selectedDept)?.name}
          </h1>
          <p
            className="text-blue-500 cursor-pointer mb-6"
            onClick={() => setSelectedDept("")}
          >
            &larr; Change Department
          </p>
          <PyqSearchBar department_id={selectedDept} />
        </div>
      )}
    </div>
  );
}
