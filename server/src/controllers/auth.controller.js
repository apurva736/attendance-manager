import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse, successResponse } from "../utils/response.js";
import { signToken } from "../utils/jwt.js";
import {
  createUser,
  ensureDepartmentByName,
  findUserByEmail,
  findUserById,
} from "../models/auth.model.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validatedBody;
  const user = await findUserByEmail(email);

  if (!user) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  if (!user.is_active) {
    return errorResponse(res, "User account is inactive", 403);
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    email: user.email,
    fullName: user.full_name,
  });

  return successResponse(
    res,
    {
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        departmentId: user.department_id,
      },
    },
    "Login successful"
  );
});

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, departmentId } = req.validatedBody;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return errorResponse(res, "An account with this email already exists", 409);
  }

  let resolvedDepartmentId = departmentId ?? null;

  if (!resolvedDepartmentId && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    const department = await ensureDepartmentByName("Computer Science");
    resolvedDepartmentId = department?.id ?? null;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({
    fullName,
    email,
    passwordHash,
    role,
    departmentId: resolvedDepartmentId,
  });

  const token = signToken({
    sub: user.id,
    role: user.role,
    email: user.email,
    fullName: user.full_name,
  });

  return successResponse(
    res,
    {
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        departmentId: user.department_id,
      },
    },
    "Registration successful",
    201
  );
});

export const me = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.sub);

  if (!user) {
    return errorResponse(res, "User not found", 404);
  }

  return successResponse(res, user, "Profile fetched");
});
