import type { Expense } from "../generated/prisma/client";

export function serializeExpense(expense: Expense) {
  return {
    ...expense,
    amount: Number(expense.amount),
  };
}
