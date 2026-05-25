import {
  BarChart3,
  BellRing,
  BookOpenCheck,
  Building2,
  GraduationCap,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ROLES } from "./roles";

export const navigationByRole = {
  [ROLES.SUPER_ADMIN]: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Institutes", path: "/institutes", icon: Building2 },
    { label: "Admins", path: "/admins", icon: ShieldCheck },
    { label: "Users", path: "/users", icon: Users },
    { label: "Alerts", path: "/notifications", icon: BellRing },
    { label: "Reports", path: "/reports", icon: BarChart3 },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  [ROLES.ADMIN]: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Departments", path: "/departments", icon: Building2 },
    { label: "Teachers", path: "/teachers", icon: Users },
    { label: "Students", path: "/students", icon: GraduationCap },
    { label: "Alerts", path: "/notifications", icon: BellRing },
    { label: "Reports", path: "/reports", icon: BarChart3 },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  [ROLES.HOD]: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Courses", path: "/courses", icon: BookOpenCheck },
    { label: "Teachers", path: "/teachers", icon: Users },
    { label: "Attendance", path: "/attendance", icon: ShieldCheck },
    { label: "Alerts", path: "/notifications", icon: BellRing },
    { label: "Reports", path: "/reports", icon: BarChart3 },
  ],
  [ROLES.TEACHER]: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Classes", path: "/classes", icon: BookOpenCheck },
    { label: "Attendance", path: "/attendance", icon: ShieldCheck },
    { label: "Students", path: "/students", icon: GraduationCap },
    { label: "Reports", path: "/reports", icon: BarChart3 },
  ],
  [ROLES.STUDENT]: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Attendance", path: "/attendance", icon: ShieldCheck },
    { label: "Courses", path: "/courses", icon: BookOpenCheck },
    { label: "Profile", path: "/profile", icon: Users },
  ],
};
