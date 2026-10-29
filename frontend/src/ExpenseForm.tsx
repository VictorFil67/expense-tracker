import { useState } from "react";
import type { Expense } from "./types/expense";
import { createExpense, updateExpense } from "./api/expenses";

export const ExpenseForm = ({
  onAddExpense,
  editingExpense,
  onUpdateExpense,
  onCancelEdit,
}: {
  onAddExpense: (exp: Expense) => void;
  editingExpense: Expense | null;
  onUpdateExpense: (exp: Expense) => void;
  onCancelEdit: () => void;
}) => {
  const [amount, setAmount] = useState(editingExpense?.amount ?? 0);
  const [category, setCategory] = useState(editingExpense?.category ?? "");
  const [description, setDescription] = useState(
    editingExpense?.description ?? "",
  );
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setFormError(null);

    const newExpense = { amount, category, description };
    let savedExpense: Expense;
    try {
      if (editingExpense === null) {
        savedExpense = await createExpense(newExpense);
      } else {
        const data = { id: editingExpense.id, ...newExpense };
        savedExpense = await updateExpense(data);
      }

      if (editingExpense === null) {
        onAddExpense(savedExpense);
      } else {
        onUpdateExpense(savedExpense);
        onCancelEdit();
      }

      setAmount(0);
      setCategory("");
      setDescription("");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setFormError(error.message);
      }
    }
  }

  function handleCancelEdit(): void {
    onCancelEdit();
    setAmount(0);
    setCategory("");
    setDescription("");
  }

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button name="submit" type="submit" className="add_expense">
          {editingExpense === null ? "Add expense" : "Update expense"}
        </button>
        {editingExpense !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
      {formError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{formError}</p>
      )}
    </>
  );
};
