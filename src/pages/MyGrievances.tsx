import { useState } from "react";
import GrievanceCard from "@/components/GrievanceCard";
import { mockGrievances, type Grievance } from "@/lib/mockData";

const MyGrievances = () => {
  const [grievances, setGrievances] = useState<Grievance[]>(
    mockGrievances.filter((g) => g.studentEmail === "user1@example.com")
  );

  const handleUpvote = (id: string) => {
    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, upvotes: g.upvotes + 1 } : g))
    );
  };

  const handleDelete = (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-center font-display text-3xl font-bold">My Grievances</h1>
      <div className="mt-8 space-y-6">
        {grievances.length === 0 ? (
          <p className="text-center text-muted-foreground">No grievances found.</p>
        ) : (
          grievances.map((g) => (
            <GrievanceCard
              key={g.id}
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
