import { useState } from "react";
import GrievanceCard from "@/components/GrievanceCard";
import { mockGrievances, departments, type Grievance } from "@/lib/mockData";

const AdminGrievances = () => {
  const [grievances, setGrievances] = useState<Grievance[]>(mockGrievances);
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = grievances.filter((g) => {
    if (filterDept && g.department !== filterDept) return false;
    if (filterStatus && g.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = (id: string, status: Grievance["status"]) => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status } : g))
    );
  };

  const handleDelete = (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
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
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No grievances match the filters.</p>
        ) : (
          filtered.map((g) => (
            <GrievanceCard
              key={g.id}
              grievance={g}
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
