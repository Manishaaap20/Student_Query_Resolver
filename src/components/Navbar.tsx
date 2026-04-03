import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/auth');
  };

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

  // If there's no user logged in, only show basic links
  const links = user ? (user.role === "admin" ? adminLinks : studentLinks) : [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" }
  ];

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
          {!user ? (
            <Link
              to="/auth"
              className="ml-4 rounded bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Login / Sign Up
            </Link>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <span className="text-sm font-medium opacity-80">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-destructive px-4 py-1.5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
              >
                Logout
              </button>
            </div>
          )}
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
          {!user ? (
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground w-fit"
            >
              Login / Sign Up
            </Link>
          ) : (
             <button
              onClick={handleLogout}
              className="mt-2 rounded bg-destructive px-4 py-1.5 text-sm font-semibold text-destructive-foreground w-fit"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
