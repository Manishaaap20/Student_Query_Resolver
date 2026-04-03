import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";

const departments = ["IT", "CSE", "ECE", "EEE", "Mech", "Civil", "Admin", "Finance"];

const CreateGrievance = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [staffId, setStaffId] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!department || !content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/grievances', {
        department,
        staffId,
        content
      });
      toast.success("Grievance created successfully!");
      navigate("/my-grievances");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create grievance");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Create New Grievance</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="flex flex-wrap gap-4">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded border border-input bg-card px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Staff Mail ID / Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="flex-1 rounded border border-input bg-card px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <textarea
          placeholder="Describe your grievance in detail..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-full rounded border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Create Grievance"}
        </button>
      </form>
    </div>
  );
};

export default CreateGrievance;
