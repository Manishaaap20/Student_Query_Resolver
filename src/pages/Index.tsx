import { Link } from "react-router-dom";
import { FileText, Shield, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="animate-fade-in font-display text-4xl font-bold leading-tight md:text-5xl">
        Student Grievances Portal
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground animate-fade-in">
        A transparent platform to raise, track, and resolve student concerns efficiently.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-5">
        <Link
          to="/my-grievances"
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <FileText size={18} />
          Student Portal
          <ArrowRight size={16} />
        </Link>
        <Link
          to="/admin"
          className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Shield size={18} />
          Admin Dashboard
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { num: "5", label: "Total Grievances" },
          { num: "1", label: "Resolved" },
          { num: "2", label: "In Progress" },
        ].map((s) => (
          <div key={s.label} className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-3xl font-bold text-accent">{s.num}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
