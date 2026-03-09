import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  role: "student" | "admin";
  onRoleToggle: () => void;
}

const Navbar = ({ role, onRoleToggle }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const studentLinks = [
    { to: "/my-grievances", label: "My Grievances" },
    { to: "/create", label: "Create Grievance" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  const adminLinks = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/grievances", label: "All Grievances" },
    { to: "/admin/students", label: "Students" },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-xl italic font-bold tracking-wide">
          Grievances Portal
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-accent-foreground/80 ${
                location.pathname === link.to ? "underline underline-offset-4" : "opacity-80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={onRoleToggle}
            className="ml-4 rounded bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            {role === "student" ? "Admin View" : "Student View"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-primary-foreground/20 px-4 pb-4 pt-2 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium opacity-90 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onRoleToggle(); setMobileOpen(false); }}
            className="mt-2 rounded bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground w-fit"
          >
            {role === "student" ? "Admin View" : "Student View"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
