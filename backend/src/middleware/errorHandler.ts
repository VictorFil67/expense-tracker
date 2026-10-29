import type { ErrorRequestHandler } from "express";
import { Prisma } from "../generated/prisma/client";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    res.status(404).json({ message: "Expense not found" });
  } else {
    res.status(500).json({ message: "Server error" });
  }
};
