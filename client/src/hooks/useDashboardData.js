import { useQuery } from "@tanstack/react-query";
import { fetchAttendanceOverview, fetchDashboardSummary } from "../services/dashboardService";

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: fetchDashboardSummary,
  });

export const useAttendanceOverview = () =>
  useQuery({
    queryKey: ["attendance-overview"],
    queryFn: fetchAttendanceOverview,
  });
