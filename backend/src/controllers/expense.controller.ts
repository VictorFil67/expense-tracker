import {
  createExpense,
  fetchExpenses,
  removeExpense,
  updateExpenseService,
} from "../services/expense.service";
import { serializeExpense } from "../helpers/serializeExpense";
import { validateExpense } from "../helpers/validateExpense";
import catchAsync from "../helpers/catchAsync";
import { parseExpenseId } from "../helpers/parseExpenseId";

export const addExpense = catchAsync(async (req, res) => {
  const { amount, category, description } = req.body;

  const error = validateExpense({ amount, category, description });

  if (error) {
    res.status(400).json({
      message: error,
    });
    return;
  }

  const response = await createExpense({
    amount,
    category,
    description,
  });
  res.status(201).json(serializeExpense(response));
});

export const getExpenses = catchAsync(async (_req, res) => {
  const response = await fetchExpenses();
  const data = response.map(serializeExpense);
  res.json(data);
});

export const deleteExpense = catchAsync(async (req, res) => {
  const id = parseExpenseId(req.params.id);
  if (!id) {
    res.status(400).json({ message: "Invalid expense id" });
    return;
  }
  const response = await removeExpense(id);

  res.json(serializeExpense(response));
});

export const updateExpense = catchAsync(async (req, res) => {
  const id = parseExpenseId(req.params.id);
  if (id === null) {
    res.status(400).json({ message: "Invalid expense id" });
    return;
  }
  const { amount, category, description } = req.body;

  const error = validateExpense({ amount, category, description });

  if (error) {
    res.status(400).json({
      message: error,
    });
    return;
  }

  const response = await updateExpenseService({
    id,
    amount,
    category,
    description,
  });
  res.json(serializeExpense(response));
});
