import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncLayout = () => {
      if (!mediaQuery.matches) {
        setIsSidebarOpen(false);
      }
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => mediaQuery.removeEventListener("change", syncLayout);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_30%),linear-gradient(180deg,_rgba(248,250,252,1)_0%,_rgba(241,245,249,1)_100%)] px-4 py-4 dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,1)_100%)]">
      <div
        className={`mx-auto grid max-w-7xl gap-4 transition-[grid-template-columns] duration-300 ${
          isSidebarCollapsed ? "lg:grid-cols-[104px_1fr]" : "lg:grid-cols-[280px_1fr]"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={() => setIsSidebarOpen(false)}
          onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        />
        <main className="space-y-4">
          <Header
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
            onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
          />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
