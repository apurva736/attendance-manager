import { errorResponse } from "../utils/response.js";

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, "Unauthorized", 401);
  }

  if (!allowedRoles.includes(req.user.role)) {
    return errorResponse(res, "Forbidden", 403);
  }

  next();
};
