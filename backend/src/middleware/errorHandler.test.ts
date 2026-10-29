import { describe, expect, it, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errorHandler";

describe("errorHandler", () => {
  it("Returns 500 for unexpected errors", () => {
    const err = new Error("Database connection failed");

    const req = {} as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
    });
  });
});
