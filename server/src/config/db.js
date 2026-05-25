import bcrypt from "bcryptjs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, "../db/schema.sql");

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.databaseSsl ? { rejectUnauthorized: false } : undefined,
});

export const query = async (text, params = []) => pool.query(text, params);

const demoUsers = [
  {
    fullName: "System Administrator",
    email: "admin@college.edu",
    role: "ADMIN",
    departmentName: null,
  },
  {
    fullName: "HOD User",
    email: "hod@college.edu",
    role: "HOD",
    departmentName: "Computer Science",
  },
  {
    fullName: "Teacher User",
    email: "teacher@college.edu",
    role: "TEACHER",
    departmentName: "Computer Science",
  },
  {
    fullName: "Student User",
    email: "student@college.edu",
    role: "STUDENT",
    departmentName: "Computer Science",
  },
];

const ensureDatabaseUrl = () => {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is missing. Add it to server/.env before starting the server.");
  }
};

const seedDemoUsers = async (client) => {
  const passwordHash = await bcrypt.hash("password123", 10);
  const departmentIds = new Map();

  for (const user of demoUsers) {
    if (!user.departmentName || departmentIds.has(user.departmentName)) {
      continue;
    }

    const departmentResult = await client.query(
      `INSERT INTO departments (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [user.departmentName]
    );

    departmentIds.set(user.departmentName, departmentResult.rows[0].id);
  }

  for (const user of demoUsers) {
    await client.query(
      `INSERT INTO users (full_name, email, password_hash, role, department_id, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       ON CONFLICT (email)
       DO UPDATE SET
         full_name = EXCLUDED.full_name,
         password_hash = EXCLUDED.password_hash,
         role = EXCLUDED.role,
         department_id = EXCLUDED.department_id,
         is_active = TRUE`,
      [
        user.fullName,
        user.email,
        passwordHash,
        user.role,
        user.departmentName ? departmentIds.get(user.departmentName) ?? null : null,
      ]
    );
  }
};

export const initializeDatabase = async () => {
  ensureDatabaseUrl();

  const client = await pool.connect();

  try {
    const schemaSql = await readFile(schemaPath, "utf8");

    await client.query("BEGIN");
    await client.query(schemaSql);
    await seedDemoUsers(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
