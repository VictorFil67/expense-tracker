import type { Expense } from "../generated/prisma/client";
import prisma from "../lib/prisma";

export async function updateExpenseService({
  id,
  amount,
  category,
  description,
}: {
  id: number;
  amount: number;
  category: string;
  description?: string;
}): Promise<Expense> {
  return prisma.expense.update({
    where: { id },
    data: { amount, category, description },
  });
}

export async function createExpense({
  amount,
  category,
  description,
}: {
  amount: number;
  category: string;
  description?: string;
}): Promise<Expense> {
  return prisma.expense.create({
    data: {
      amount,
      category,
      description,
    },
  });
}

export async function fetchExpenses(): Promise<Expense[]> {
  return prisma.expense.findMany();
}

export async function removeExpense(id: number): Promise<Expense> {
  return prisma.expense.delete({ where: { id } });
}
