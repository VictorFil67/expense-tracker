export function validateExpense(
  //   {
  //   amount,
  //   category,
  //   description,
  // }: {
  //   amount: number;
  //   category: string;
  //   description?: string;
  // }
  data: unknown,
): string | null {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "Invalid expense data";
  }
  const expenseData = data as Record<string, unknown>;
  const { amount, category, description } = expenseData;
  if (
    typeof amount !== "number" ||
    amount <= 0 ||
    !Number.isFinite(amount) ||
    typeof category !== "string" ||
    category.trim() === "" ||
    (description !== undefined && typeof description !== "string")
  ) {
    return "Invalid expense data";
  }
  return null;
}
