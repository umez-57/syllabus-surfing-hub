import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TimetableScheduler = () => {
  const [theoryFile, setTheoryFile] = useState<File | null>(null);
  const [labFile, setLabFile] = useState<File | null>(null);
  const [timetableData, setTimetableData] = useState<any[]>([]);

  const onDropTheory = (acceptedFiles: File[]) => {
    setTheoryFile(acceptedFiles[0]);
  };

  const onDropLab = (acceptedFiles: File[]) => {
    setLabFile(acceptedFiles[0]);
  };

  const processPDFs = async () => {
    if (!theoryFile || !labFile) {
      toast({
        title: "Error",
        description: "Please upload both Theory and Lab PDFs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", theoryFile);

      const response = await fetch("http://localhost:8000/extract", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setTimetableData(result.data);
        toast({
          title: "Success",
          description: "PDFs processed successfully.",
        });
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process PDFs.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const resetTimetable = () => {
    setTimetableData([]);
    toast({
      title: "Success",
      description: "Timetable reset successfully.",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Timetable Scheduler</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Upload Theory PDF</h2>
          <div
            {...useDropzone({ onDrop: onDropTheory })}
            className="border-2 border-dashed p-4 rounded-md text-center"
          >
            {theoryFile ? (
              <p className="text-green-500">{theoryFile.name}</p>
            ) : (
              <p>Drag & drop a Theory PDF or click to upload</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Upload Lab PDF</h2>
          <div
            {...useDropzone({ onDrop: onDropLab })}
            className="border-2 border-dashed p-4 rounded-md text-center"
          >
            {labFile ? (
              <p className="text-green-500">{labFile.name}</p>
            ) : (
              <p>Drag & drop a Lab PDF or click to upload</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <Button variant="destructive" onClick={processPDFs}>
          Process PDFs
        </Button>
        <Button variant="secondary" onClick={resetTimetable}>
          Reset Timetable
        </Button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Timetable</h2>
        {timetableData.length > 0 ? (
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                {Object.keys(timetableData[0]).map((key) => (
                  <th key={key} className="border px-4 py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="border px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No timetable data available.</p>
        )}
      </div>
    </div>
  );
};

export default TimetableScheduler;
