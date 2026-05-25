import { query } from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await query(
    `SELECT id, full_name, email, password_hash, role, department_id, is_active
     FROM users
     WHERE email = $1
     LIMIT 1`,
    [email]
  );

  return result.rows[0] || null;
};

export const ensureDepartmentByName = async (name) => {
  const result = await query(
    `INSERT INTO departments (name)
     VALUES ($1)
     ON CONFLICT (name)
     DO UPDATE SET name = EXCLUDED.name
     RETURNING id, name`,
    [name]
  );

  return result.rows[0] || null;
};

export const createUser = async ({ fullName, email, passwordHash, role, departmentId = null }) => {
  const result = await query(
    `INSERT INTO users (full_name, email, password_hash, role, department_id, is_active)
     VALUES ($1, $2, $3, $4, $5, TRUE)
     RETURNING id, full_name, email, role, department_id, is_active, created_at`,
    [fullName, email, passwordHash, role, departmentId]
  );

  return result.rows[0] || null;
};

export const findUserById = async (id) => {
  const result = await query(
    `SELECT id, full_name, email, role, department_id, is_active, created_at
     FROM users
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  return result.rows[0] || null;
};
