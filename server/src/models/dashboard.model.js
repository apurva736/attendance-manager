import { query } from "../config/db.js";

export const getSystemStats = async () => {
  const result = await query(
    `SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM departments) AS total_departments,
      (SELECT COUNT(*) FROM courses) AS total_courses,
      (SELECT COUNT(*) FROM attendance_records) AS total_attendance_records`
  );

  return result.rows[0];
};
