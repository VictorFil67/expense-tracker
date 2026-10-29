import "dotenv/config";
import app from "./app";
import prisma from "./lib/prisma";

const { PORT = 3000 } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Expense Tracker API is running on the PORT ${PORT}`);
});

const shutdown = () => {
  console.log("Shutdown signal received");

  server.close((error) => {
    if (error) {
      console.error("Error closing server:", error);
      return;
    }
    console.log("Server stopped");
    prisma
      .$disconnect()
      .then(() => {
        console.log("Database disconnected");
      })
      .catch((error) => {
        console.error("Failed to disconnect Prisma:", error);
      });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
