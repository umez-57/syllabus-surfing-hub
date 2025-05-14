import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PyqSearchBar } from "@/components/PyqSearchBar";
import { Navbar } from "@/components/Navbar";
import Folder from "@/components/Folder";
import { Hero } from "@/components/hero";

export function PyqHome() {
  const [selectedDept, setSelectedDept] = useState<string>("");
  const { search } = useLocation();
  const navigate = useNavigate();

  /* departments */
  const departments = [
    { id: "e6cc847f-4113-4a9b-8193-1da79c0327eb", name: "SCOPE", fn: "SCOPE (CSE)" },
    { id: "c768f9c9-ac7d-469c-8e49-4a210f0d8a21", name: "SENSE", fn: "SENSE (ECE)" },
    { id: "aebb09ae-3b6f-4b31-904b-e9a41b318722", name: "SAS", fn: "SAS (Science)" },
    { id: "156ac56e-b719-4e78-8d56-762b49e1e689", name: "VSB", fn: "VSB (Management)" },
    { id: "23b4f969-c687-4694-aa47-1455481021da", name: "VISH", fn: "VISH (Humanities)" },
  ];

  /* auto-select dept from URL */
  useEffect(() => {
    const params = new URLSearchParams(search);
    const dept = params.get("dept");
    if (dept && departments.some((d) => d.id === dept)) {
      setSelectedDept(dept);
    }
  }, [search]);

  /* helper to update URL when user picks a folder */
  const chooseDept = (deptId: string) => {
    navigate(`/pyq?dept=${deptId}`, { replace: true });
    setSelectedDept(deptId);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero className="absolute inset-0 -z-10" gradient blur />
      <Navbar />

      {!selectedDept ? (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Select Your Department For PYQs
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
            {departments.map((dept) => (
              <div key={dept.id} className="flex flex-col items-center">
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
                <br />
                <p className="font-semibold text-white">{dept.fn}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 text-white">
          <h1 className="text-3xl font-bold mb-4">
            Previous Year Papers for {departments.find((d) => d.id === selectedDept)?.name}
          </h1>
          <p
            className="text-blue-300 cursor-pointer mb-6"
            onClick={() => setSelectedDept("")}
          >
            &larr; Change Department
          </p>

          {/* search bar */}
          <PyqSearchBar department_id={selectedDept} />
        </div>
      )}
    </div>
  );
}
