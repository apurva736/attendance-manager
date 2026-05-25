import clsx from "clsx";
import { ChevronLeft, ChevronRight, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationByRole } from "../../constants/navigation";
import { useAuthStore } from "../../store/authStore";

export function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }) {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const items = navigationByRole[user?.role] || [];

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={clsx(
          "panel fixed inset-y-4 left-4 z-40 flex w-[280px] flex-col rounded-[2rem] px-4 py-5 transition-transform duration-300 lg:sticky lg:inset-auto lg:left-auto lg:top-4 lg:min-h-[calc(100vh-2rem)] lg:w-auto lg:translate-x-0 lg:rounded-[2rem]",
          isOpen ? "translate-x-0" : "-translate-x-[120%]",
          isCollapsed && "lg:px-3"
        )}
      >
        <div className={clsx("mb-8 flex items-start justify-between gap-3", isCollapsed && "lg:flex-col lg:items-center")}>
          <div className={clsx(isCollapsed && "lg:text-center")}>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-600">College AMS</p>
            <h1 className={clsx("mt-3 text-2xl font-semibold", isCollapsed && "lg:text-lg")}>
              {isCollapsed ? "AMS" : "Attendance Hub"}
            </h1>
            {!isCollapsed ? (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user?.role?.replace("_", " ")}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white lg:inline-flex"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isCollapsed ? "gap-0 lg:justify-center lg:px-3" : "gap-3",
                    isActive
                      ? "bg-brand-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  )
                }
              >
                <Icon size={18} />
                {!isCollapsed ? <span>{item.label}</span> : null}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={clearAuth}
          className={clsx(
            "mt-6 inline-flex items-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-rose-400 hover:text-rose-600 dark:border-slate-800 dark:text-slate-200",
            isCollapsed ? "gap-0 justify-center lg:px-3" : "gap-3"
          )}
        >
          <LogOut size={18} />
          {!isCollapsed ? <span>Logout</span> : null}
        </button>
      </aside>
    </>
  );
}
