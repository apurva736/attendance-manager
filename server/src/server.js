import { createApp } from "./app.js";
import { initializeDatabase } from "./config/db.js";
import { env } from "./config/env.js";

const startServer = async () => {
  try {
    await initializeDatabase();

    const app = createApp();

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${env.port} is already in use. Stop the existing server or change PORT in server/.env.`);
      } else {
        console.error("Failed to start server:", error.message);
      }

      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
