import cors from "cors";
import express from "express";
import expenseRouter from "./routes/expense.routes";
import { errorHandler } from "./middleware/errorHandler";
import { unknownRouteHandler } from "./middleware/unknownRouteHandler";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => res.send(`Expense Tracker API is running`));
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Expense Tracker API is running",
  });
});
app.use("/api/expenses", expenseRouter);

app.use(unknownRouteHandler);

app.use(errorHandler);

export default app;
