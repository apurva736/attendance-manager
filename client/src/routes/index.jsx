import {
  createBrowserRouter,
  Navigate,
  RouterProvider as BaseRouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AppLayout } from "../components/layout/AppLayout";
import { ROLES } from "../constants/roles";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotificationsAlertsPage from "../pages/NotificationsAlertsPage";
import PlaceholderPage from "../pages/PlaceholderPage";
import ReportsAnalyticsPage from "../pages/ReportsAnalyticsPage";
import TakeAttendancePage from "../pages/TakeAttendancePage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <LoginPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "/dashboard", element: <DashboardPage /> },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]} />,
            children: [
              { path: "/institutes", element: <PlaceholderPage title="Institutes" description="Manage institutions, tenancy, and top-level academic settings." /> },
              { path: "/admins", element: <PlaceholderPage title="Admin Management" description="Create and manage platform admins and assign access boundaries." /> },
              { path: "/users", element: <PlaceholderPage title="User Directory" description="Search and manage all users across departments and roles." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [
              { path: "/departments", element: <PlaceholderPage title="Departments" description="Configure departments, academic batches, and ownership mapping." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.HOD]} />,
            children: [
              { path: "/teachers", element: <PlaceholderPage title="Teachers" description="Assign teachers, workloads, class responsibilities, and attendance permissions." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER]} />,
            children: [
              { path: "/students", element: <PlaceholderPage title="Students" description="Manage student records, enrollments, sections, and attendance visibility." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.HOD, ROLES.STUDENT]} />,
            children: [
              { path: "/courses", element: <PlaceholderPage title="Courses" description="View assigned courses, semester structure, and course-specific attendance." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.TEACHER]} />,
            children: [
              { path: "/classes", element: <PlaceholderPage title="My Classes" description="Track daily classes, subject assignments, and session-level attendance actions." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.HOD, ROLES.TEACHER, ROLES.STUDENT]} />,
            children: [
              { path: "/attendance", element: <TakeAttendancePage /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.STUDENT]} />,
            children: [
              { path: "/profile", element: <PlaceholderPage title="Profile" description="Review your student profile, enrollment, and attendance summary." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]} />,
            children: [
              { path: "/settings", element: <PlaceholderPage title="Settings" description="Manage application settings, branding, and access defaults." /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HOD, ROLES.TEACHER]} />,
            children: [
              { path: "/reports", element: <ReportsAnalyticsPage /> },
            ],
          },
          {
            element: <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HOD]} />,
            children: [
              { path: "/notifications", element: <NotificationsAlertsPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

export function RouterProvider() {
  return <BaseRouterProvider router={router} future={{ v7_startTransition: true }} />;
}
