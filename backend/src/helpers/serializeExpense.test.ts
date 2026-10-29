import { describe, expect, it } from "vitest";
import { serializeExpense } from "./serializeExpense";
import { Decimal } from "@prisma/client/runtime/client";

describe("serializeExpense", () => {
  it("returns type number for incoming amount 25.5", () => {
    const result = serializeExpense({
      id: 25,
      amount: new Decimal(25.5),
      category: "Food",
      description: "Test",
      createdAt: new Date("2026-10-23T18:18:34.786Z"),
    });
    expect(result).toEqual(
      expect.objectContaining({
        id: 25,
        amount: 25.5,
        category: "Food",
        description: "Test",
      }),
    );
    expect(typeof result.amount).toBe("number");
  });
});
