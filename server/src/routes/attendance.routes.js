import { Router } from "express";
import { getAttendanceOverview } from "../controllers/attendance.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.get(
  "/overview",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.HOD, ROLES.TEACHER, ROLES.STUDENT),
  getAttendanceOverview
);

export default router;
