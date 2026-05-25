import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { getSystemStats } from "../models/dashboard.model.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const stats = await getSystemStats().catch(() => ({
    total_users: 0,
    total_departments: 0,
    total_courses: 0,
    total_attendance_records: 0,
  }));

  return successResponse(
    res,
    {
      role: req.user.role,
      summary: stats,
      quickActions: [
        "Manage departments",
        "Assign courses",
        "Track attendance",
        "Review reports",
      ],
    },
    "Dashboard summary fetched"
  );
});
