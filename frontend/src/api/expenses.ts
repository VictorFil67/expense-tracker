import type { Expense } from "../types/expense";

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch("http://localhost:3000/api/expenses");
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function createExpense({
  amount,
  category,
  description,
}: {
  amount: number;
  category: string;
  description: string;
}): Promise<Expense> {
  const response = await fetch("http://localhost:3000/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      category,
      description,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
}

export async function updateExpense({
  id,
  amount,
  category,
  description,
}: {
  id: number;
  amount: number;
  category: string;
  description: string;
}): Promise<Expense> {
  const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, category, description }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const data = await response.json();
  return data;
}

export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}
