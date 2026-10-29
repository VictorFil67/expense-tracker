import { describe, expect, it } from "vitest";
import { parseExpenseId } from "./parseExpenseId";

describe("parseExpenseId", () => {
  it("returns number for valid string id", () => {
    expect(parseExpenseId("123")).toBe(123);
  });

  it("returns null for non-numeric id", () => {
    expect(parseExpenseId("abc")).toBe(null);
  });

  it("returns null for zero id", () => {
    expect(parseExpenseId("0")).toBe(null);
  });

  it("returns null for negative id", () => {
    expect(parseExpenseId("-5")).toBe(null);
  });

  it("returns null for decimal id", () => {
    expect(parseExpenseId("1.5")).toBe(null);
  });

  it("returns null for array id", () => {
    expect(parseExpenseId(["123"])).toBe(null);
  });
});
