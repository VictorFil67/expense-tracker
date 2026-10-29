import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller";

const expenseRouter = Router();

expenseRouter.post("/", addExpense);
expenseRouter.get("/", getExpenses);
expenseRouter.delete("/:id", deleteExpense);
expenseRouter.put("/:id", updateExpense);

export default expenseRouter;
