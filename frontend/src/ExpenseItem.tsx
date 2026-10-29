import type { Expense } from "./types/expense";

export const ExpenseItem = ({
  expense,
  onDeleteExpense,
  onEditExpense,
}: {
  expense: Expense;
  onDeleteExpense: (id: number) => void;
  onEditExpense: (expense: Expense) => void;
}) => {
  return (
    <li>
      {expense.category} - {expense.amount} - {expense.description}
      <button type="button" onClick={() => onDeleteExpense(expense.id)}>
        Delete
      </button>
      <button type="button" onClick={() => onEditExpense(expense)}>
        Edit
      </button>
    </li>
  );
};
