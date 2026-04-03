import { useState, useEffect } from "react";
import GrievanceCard from "@/components/GrievanceCard";
import api from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const MyGrievances = () => {
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

  const handleUpvote = async (id: string) => {
    try {
      const { data } = await api.put(`/grievances/${id}/upvote`);
      setGrievances((prev) =>
        prev.map((g) => (g._id === id ? data : g))
      );
    } catch (error: any) {
      toast({ 
        title: "Could not upvote", 
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive" 
      });
    }
  };

  const handleDelete = (id: string) => {
    // Only simulated for now, no delete backend route
    setGrievances((prev) => prev.filter((g) => g._id !== id));
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-center font-display text-3xl font-bold">My Grievances</h1>
      <div className="mt-8 space-y-6">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading grievances...</p>
        ) : grievances.length === 0 ? (
          <p className="text-center text-muted-foreground">No grievances found.</p>
        ) : (
          grievances.map((g) => (
            <GrievanceCard
              key={g._id}
              grievance={g}
              onUpvote={handleUpvote}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyGrievances;
