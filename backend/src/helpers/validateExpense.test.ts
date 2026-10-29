import { describe, expect, it } from "vitest";
import { validateExpense } from "./validateExpense";

describe("validateExpense", () => {
  // 1. ГРУППА — что тестируем
  it("returns null for valid data", () => {
    // 2. СЦЕНАРИЙ — конкретный случай
    const result = validateExpense({
      // 3. ПРОВЕРКА:
      amount: 50, //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe(null); //    - проверяем результат
  });
  it("rejects zero amount", () => {
    const result = validateExpense({
      amount: 0, //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("rejects negative amount", () => {
    const result = validateExpense({
      amount: -10, //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("rejects string amount", () => {
    const result = validateExpense({
      amount: "50", //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("rejects NaN amount", () => {
    const result = validateExpense({
      amount: NaN, //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("rejects Infinity amount", () => {
    const result = validateExpense({
      amount: Infinity, //    - вызываем функцию
      category: "Food", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("rejects negative Infinity amount", () => {
    const result = validateExpense({
      amount: -Infinity,
      category: "Food",
      description: "Lunch",
    });

    expect(result).toBe("Invalid expense data");
  });
  it("rejects category containing only whitespace", () => {
    const result = validateExpense({
      amount: 10, //    - вызываем функцию
      category: " ", //    - с конкретными данными
      description: "Lunch",
    });
    expect(result).toBe("Invalid expense data"); //    - проверяем результат
  });
  it("accepts category with surrounding spaces", () => {
    const result = validateExpense({
      amount: 50,
      category: "  Food  ",
      description: "Lunch",
    });

    expect(result).toBe(null);
  });
  it("returns null when description is omitted", () => {
    const result = validateExpense({
      amount: 50,
      category: "Food",
    });

    expect(result).toBe(null);
  });
  it("rejects numeric description", () => {
    const result = validateExpense({
      amount: 50,
      category: "Food",
      description: 123,
    });

    expect(result).toBe("Invalid expense data");
  });
  it("rejects null description", () => {
    const result = validateExpense({
      amount: 50,
      category: "Food",
      description: null,
    });

    expect(result).toBe("Invalid expense data");
  });
});
