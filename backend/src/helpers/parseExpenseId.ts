export function parseExpenseId(stringId: string | string[]): number | null {
  if (typeof stringId !== "string") {
    return null;
  }
  const id = Number(stringId);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}
