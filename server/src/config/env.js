import dotenv from "dotenv";

dotenv.config();

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }

  return String(value).toLowerCase() === "true";
};

const parseOrigins = () => {
  const rawOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URLS]
    .filter(Boolean)
    .flatMap((value) => String(value).split(","))
    .map((value) => value.trim())
    .filter(Boolean);

  return [...new Set(rawOrigins.length ? rawOrigins : ["http://localhost:5173"])];
};

export const env = {
  port: process.env.PORT || 5001,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  clientUrls: parseOrigins(),
  databaseUrl: process.env.DATABASE_URL || "",
  databaseSsl: parseBoolean(process.env.DATABASE_SSL, false),
  allowVercelPreviews: parseBoolean(process.env.ALLOW_VERCEL_PREVIEWS, false),
  jwtSecret: process.env.JWT_SECRET || "change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
};
