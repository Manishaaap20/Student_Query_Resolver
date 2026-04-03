import { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState<any[]>([]);
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

  const stats = [
    { label: "Total", value: grievances.length, icon: FileText, color: "text-primary" },
    { label: "Solved", value: grievances.filter((g) => g.status === "Solved").length, icon: CheckCircle, color: "text-success" },
    { label: "In Progress", value: grievances.filter((g) => g.status === "In Progress").length, icon: Clock, color: "text-warning" },
    { label: "Not Solved", value: grievances.filter((g) => g.status === "Not Solved").length, icon: AlertCircle, color: "text-destructive" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <s.icon className={`${s.color}`} size={28} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold">Recent Grievances</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        {loading ? (
          <p className="p-4 text-center text-muted-foreground">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Student</th>
                <th className="px-4 py-3 text-left font-semibold">Department</th>
                <th className="px-4 py-3 text-left font-semibold">Content</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {grievances.slice(0, 10).map((g) => (
                <tr key={g._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3">{g.studentName}</td>
                  <td className="px-4 py-3">{g.department}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{g.content}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      g.status === "Solved" ? "bg-success text-success-foreground" :
                      g.status === "In Progress" ? "bg-warning text-warning-foreground" :
                      "bg-destructive text-destructive-foreground"
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{g.upvotes}</td>
                </tr>
              ))}
              {grievances.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-muted-foreground">No recent grievances</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
