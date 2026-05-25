import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../common/Loader";
import { useAuthStore } from "../../store/authStore";

export function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const { token, user, isBootstrapping } = useAuthStore((state) => ({
    token: state.token,
    user: state.user,
    isBootstrapping: state.isBootstrapping,
  }));

  if (isBootstrapping) {
    return <Loader label="Checking your session..." />;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
