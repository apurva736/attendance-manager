import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

export const getAttendanceOverview = asyncHandler(async (req, res) => {
  return successResponse(
    res,
    {
      role: req.user.role,
      attendanceRate: 92,
      todaysClasses: 5,
      markedStudents: 142,
      pendingEntries: 2,
    },
    "Attendance overview fetched"
  );
});
