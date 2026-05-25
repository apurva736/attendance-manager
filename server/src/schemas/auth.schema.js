import { z } from "zod";
import { ROLE_OPTIONS } from "../constants/roles.js";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(ROLE_OPTIONS),
  departmentId: z.number().int().positive().nullable().optional(),
});
