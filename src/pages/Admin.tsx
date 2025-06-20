import { SyllabusUploadForm } from "@/components/SyllabusUploadForm";

const Admin = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Upload Syllabus</h2>
          <SyllabusUploadForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;