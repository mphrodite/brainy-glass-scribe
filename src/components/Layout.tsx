
import React from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>
      <Toaster />
    </div>
  );
};
