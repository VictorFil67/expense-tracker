import { useEffect, useState } from "react";

import "./App.css";

import { ExpenseForm } from "./ExpenseForm";
import { ExpenseList } from "./ExpenseList";
import type { Expense } from "./types/expense";
import { deleteExpense, getExpenses } from "./api/expenses";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  function onAddExpense(exp: Expense): void {
    setExpenses((expenses) => [...expenses, exp]);
  }

  async function onDeleteExpense(id: number): Promise<void> {
    setDeleteError(null);

    try {
      await deleteExpense(id);

      setExpenses((expenses) => expenses.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Failed to delete expense");
      }
    }
  }

  function onEditExpense(expense: Expense): void {
    setEditingExpense(expense);
  }

  function onUpdateExpense(expense: Expense) {
    setExpenses((expenses) =>
      expenses.map((exp) => (exp.id === expense.id ? expense : exp)),
    );
  }

  function onCancelEdit(): void {
    setEditingExpense(null);
  }

  async function fetchExpenses() {
    try {
      const data = await getExpenses();
      setError(null);
      setExpenses(data);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    setError(null);
    setLoading(true);
    fetchExpenses();
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>
          <h2>{error}</h2>
          <button type="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <section id="center">
          <div>
            <h1>Personal Expense Tracker</h1>
            <p>Track your income and expenses</p>
          </div>
          <ExpenseForm
            key={editingExpense?.id ?? "new"}
            onAddExpense={onAddExpense}
            editingExpense={editingExpense}
            onUpdateExpense={onUpdateExpense}
            onCancelEdit={onCancelEdit}
          />
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onEditExpense}
            deleteError={deleteError}
          />
        </section>
      )}
    </>
  );
}

export default App;
