import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import catchAsync from "./catchAsync";

describe("catchAsync", () => {
  it("Verify sending an error to next", async () => {
    const error = new Error("test error");
    const fn = vi.fn().mockRejectedValue(error);
    const next = vi.fn() as NextFunction;
    const req = {} as Request;
    const res = {} as Response;
    const handler = catchAsync(fn);
    handler(req, res, next);
    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });
});
