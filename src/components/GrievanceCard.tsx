import { ArrowUp, Trash2 } from "lucide-react";
import type { Grievance } from "@/lib/mockData";

interface GrievanceCardProps {
  grievance: Grievance;
  showActions?: boolean;
  onUpvote?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Grievance["status"]) => void;
}

const statusStyles: Record<Grievance["status"], string> = {
  "Not Solved": "bg-destructive text-destructive-foreground",
  "In Progress": "bg-warning text-warning-foreground",
  "Solved": "bg-success text-success-foreground",
};

const GrievanceCard = ({ grievance, showActions = true, onUpvote, onDelete, onStatusChange }: GrievanceCardProps) => {
  return (
    <div className="animate-fade-in rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs text-muted-foreground">{grievance.createdAt}</span>
        <div className="flex items-center gap-2">
          <span className={`rounded px-2.5 py-1 text-xs font-semibold ${statusStyles[grievance.status]}`}>
            {grievance.status === "Solved" && "✓ "}
            {grievance.status}
          </span>
          {onStatusChange && (
            <select
              value={grievance.status}
              onChange={(e) => onStatusChange(grievance.id, e.target.value as Grievance["status"])}
              className="rounded border border-input bg-background px-2 py-1 text-xs"
            >
              <option>Not Solved</option>
              <option>In Progress</option>
              <option>Solved</option>
            </select>
          )}
        </div>
      </div>

      <h3 className="mt-3 text-center font-display text-lg font-semibold text-accent">Grievance</h3>

      <div className="mt-3 space-y-1.5 text-sm">
        <p><span className="font-semibold">Student Email:</span> {grievance.studentEmail}</p>
        <p><span className="font-semibold">Content:</span> {grievance.content}</p>
        <p><span className="font-semibold">Department:</span> {grievance.department}</p>
        <p><span className="font-semibold">Concerned Staff Email:</span> {grievance.concernedStaffEmail}</p>
      </div>

      {showActions && (
        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            onClick={() => onUpvote?.(grievance.id)}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            <ArrowUp size={14} />
            {grievance.upvotes}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(grievance.id)}
              className="rounded p-1.5 text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GrievanceCard;
