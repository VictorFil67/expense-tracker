import { type Dispatch, type SetStateAction } from "react";

export const ExpenseCounter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div>
      <h2>Expenses added: {count}</h2>
      <button
        type="button"
        className="add_expense"
        onClick={() => setCount((count) => count + 1)}
      >
        Add expense
      </button>
    </div>
  );
};
