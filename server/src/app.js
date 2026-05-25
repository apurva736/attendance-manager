import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export const createApp = () => {
  const app = express();

  const allowedOrigins = new Set(env.clientUrls);
  const isAllowedOrigin = (origin) => {
    if (!origin) {
      return true;
    }

    if (allowedOrigins.has(origin)) {
      return true;
    }

    if (env.allowVercelPreviews && origin.endsWith(".vercel.app")) {
      return true;
    }

    return false;
  };

  app.use(
    cors({
      origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "Server is healthy",
    });
  });

  app.use("/api", routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
