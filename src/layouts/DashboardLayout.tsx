import { ReactNode } from "react";

interface DashboardLayoutProps {
  navbar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ navbar, sidebar, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Sticky Top Navbar */}
      <div className="sticky top-0 z-50">
        {navbar}
      </div>
      
      <div className="flex relative">
        {/* Sticky Left Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] z-40">
          {sidebar}
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 w-0 min-w-0">
          <div className="bg-white/5 backdrop-blur-sm border-l border-white/10 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}