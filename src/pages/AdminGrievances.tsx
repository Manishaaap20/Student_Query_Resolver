import { useState, useEffect } from "react";
import GrievanceCard from "@/components/GrievanceCard";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const departments = ["IT", "CSE", "ECE", "EEE", "Mech", "Civil", "Admin", "Finance"];

const AdminGrievances = () => {
  const [grievances, setGrievances] = useState<any[]>([]);
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const { data } = await api.get('/grievances');
      setGrievances(data);
    } catch (error) {
      toast({ title: "Failed to fetch grievances", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filtered = grievances.filter((g) => {
    if (filterDept && g.department !== filterDept) return false;
    if (filterStatus && g.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { data } = await api.put(`/grievances/${id}/status`, { status });
      setGrievances((prev) =>
        prev.map((g) => (g._id === id ? { ...g, status: data.status } : g))
      );
      toast({ title: "Status updated successfully" });
    } catch (error: any) {
      toast({ title: "Failed to update status", description: error.response?.data?.message || "Error", variant: "destructive" });
    }
  };

  const handleDelete = (id: string) => {
    // Only simulated for now, no backend delete route implemented.
    setGrievances((prev) => prev.filter((g) => g._id !== id));
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">All Grievances</h1>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="rounded border border-input bg-card px-3 py-2 text-sm"
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded border border-input bg-card px-3 py-2 text-sm"
        >
          <option value="">All Statuses</option>
          <option>Not Solved</option>
          <option>In Progress</option>
          <option>Solved</option>
        </select>
      </div>

      <div className="mt-6 space-y-5">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading grievances...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No grievances match the filters.</p>
        ) : (
          filtered.map((g) => (
            <GrievanceCard
              key={g._id}
              grievance={{...g, id: g._id}}  
              // Remapping _id to id to avoid extensive GrievanceCard refactor
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminGrievances;
