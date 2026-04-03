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

import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
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
    </AuthProvider>
  );
};

export default App;
