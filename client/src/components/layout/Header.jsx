import { PanelLeft, PanelLeftClose } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import { useAuthStore } from "../../store/authStore";

export function Header({ isSidebarCollapsed, onToggleSidebar, onToggleCollapse }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex flex-col gap-4 rounded-[2rem] bg-gradient-to-r from-brand-600 via-blue-500 to-cyan-500 px-6 py-6 text-white shadow-panel md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur lg:hidden"
            aria-label="Open sidebar"
          >
            <PanelLeft size={18} />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur lg:inline-flex"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Welcome back</p>
        <h2 className="mt-2 text-3xl font-semibold">{user?.fullName || "User"}</h2>
        <p className="mt-2 max-w-2xl text-sm text-blue-50">
          Monitor attendance operations, role-level access, and daily academic activity from one place.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/15 px-4 py-3 text-right backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-100">Signed in as</p>
          <p className="mt-1 font-medium">{user?.email}</p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
