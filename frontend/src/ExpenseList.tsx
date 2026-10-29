import { ExpenseItem } from "./ExpenseItem";
import type { Expense } from "./types/expense";

export const ExpenseList = ({
  expenses,
  onDeleteExpense,
  onEditExpense,
  deleteError,
}: {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
  onEditExpense: (expense: Expense) => void;
  deleteError: string | null;
}) => {
  return (
    <>
      <ul>
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onEditExpense}
          />
        ))}
      </ul>
      {deleteError && (
        <p style={{ color: "red", fontWeight: "bold" }}>{deleteError}</p>
      )}
    </>
  );
};
