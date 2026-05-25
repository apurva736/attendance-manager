import { api } from "../lib/api";

export const fetchDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");
  return response.data.data;
};

export const fetchAttendanceOverview = async () => {
  const response = await api.get("/attendance/overview");
  return response.data.data;
};
