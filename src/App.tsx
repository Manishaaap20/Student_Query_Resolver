import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import MyGrievances from "./pages/MyGrievances";
import CreateGrievance from "./pages/CreateGrievance";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGrievances from "./pages/AdminGrievances";
import AdminStudents from "./pages/AdminStudents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [role, setRole] = useState<"student" | "admin">("student");
  const toggleRole = () => setRole((r) => (r === "student" ? "admin" : "student"));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar role={role} onRoleToggle={toggleRole} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/my-grievances" element={<MyGrievances />} />
            <Route path="/create" element={<CreateGrievance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/grievances" element={<AdminGrievances />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
