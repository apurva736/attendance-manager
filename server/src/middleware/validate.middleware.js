import { errorResponse } from "../utils/response.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return errorResponse(res, "Validation failed", 400, result.error.flatten());
  }

  req.validatedBody = result.data;
  next();
};
