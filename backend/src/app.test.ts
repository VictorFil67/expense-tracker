import { describe, expect, it } from "vitest";
import app from "./app";
import request from "supertest";
import prisma from "./lib/prisma";

describe("Verify connection Express → route → response", () => {
  it("Return status 200", async () => {
    const result = await request(app).get("/api/health");
    expect(result.body).toEqual({
      status: "ok",
      message: "Expense Tracker API is running",
    });
    expect(result.status).toBe(200);
  });
  it("Rejects incorrect data", async () => {
    const result = await request(app)
      .post("/api/expenses")
      .send({ amount: 0, category: "Food", description: "Lunch" });
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "Invalid expense data" });
  });
  it("Return 404 for absent expense", async () => {
    const result = await request(app).delete("/api/expenses/9999");
    expect(result.status).toBe(404);
    expect(result.body).toEqual({ message: "Expense not found" });
  });
  it("Return 404 for absent expense", async () => {
    const result = await request(app).put("/api/expenses/9999").send({
      amount: 10,
      category: "Food",
      description: "Test",
    });
    expect(result.status).toBe(404);
    expect(result.body).toEqual({ message: "Expense not found" });
  });
  it("Return 400 for invalid expense id", async () => {
    const result = await request(app).delete("/api/expenses/abc");
    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "Invalid expense id" });
  });
  it("Return status 201 for succesful expense creation", async () => {
    let savedId: number | undefined;
    try {
      const result = await request(app)
        .post("/api/expenses")
        .send({ amount: 5, category: "Food-test", description: "Lunch-test" });

      savedId = result.body.id;

      expect(result.status).toBe(201);
      expect(result.body).toEqual(
        expect.objectContaining({
          amount: 5,
          category: "Food-test",
          description: "Lunch-test",
        }),
      );
      expect(result.body.id).toEqual(expect.any(Number));
      const savedExpense = await prisma.expense.findUnique({
        where: { id: result.body.id },
      });
      expect(savedExpense).not.toBe(null);
    } finally {
      if (savedId !== undefined) {
        await prisma.expense.deleteMany({ where: { id: savedId } });
      }
    }
  });
  it("Return status 200 for succesful expense updating", async () => {
    const expense = await prisma.expense.create({
      data: { amount: 5, category: "Food-test", description: "Lunch-test" },
    });
    try {
      const result = await request(app)
        .put(`/api/expenses/${expense.id}`)
        .send({
          amount: 6,
          category: "Food-test-new",
          description: "Lunch-test-new",
        });
      expect(result.status).toBe(200);
      expect(result.body).toEqual(
        expect.objectContaining({
          id: expense.id,
          amount: 6,
          category: "Food-test-new",
          description: "Lunch-test-new",
        }),
      );
    } finally {
      await prisma.expense.deleteMany({ where: { id: expense.id } });
    }
  });
  it("Return status 200 for succesful expense deleting", async () => {
    const expense = await prisma.expense.create({
      data: { amount: 5, category: "Food-test", description: "Lunch-test" },
    });
    try {
      const result = await request(app).delete(`/api/expenses/${expense.id}`);

      expect(result.status).toBe(200);
      expect(result.body).toEqual(
        expect.objectContaining({
          id: expense.id,
          amount: 5,
          category: "Food-test",
          description: "Lunch-test",
        }),
      );
      const deletedExpense = await prisma.expense.findUnique({
        where: { id: expense.id },
      });
      expect(deletedExpense).toBeNull();
    } finally {
      await prisma.expense.deleteMany({ where: { id: expense.id } });
    }
  });
  it("Rejects string amount", async () => {
    const result = await request(app).post("/api/expenses").send({
      amount: "50",
      category: "Food",
      description: "Lunch",
    });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      message: "Invalid expense data",
    });
  });
  it("Return 400 for zero expense id", async () => {
    const result = await request(app).delete("/api/expenses/0");

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "Invalid expense id" });
  });

  it("Return 400 for negative expense id", async () => {
    const result = await request(app).delete("/api/expenses/-5");

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "Invalid expense id" });
  });

  it("Return 400 for decimal expense id", async () => {
    const result = await request(app).delete("/api/expenses/1.5");

    expect(result.status).toBe(400);
    expect(result.body).toEqual({ message: "Invalid expense id" });
  });
  it.each(["0", "-5", "1.5"])(
    "Return 400 for invalid expense id: %s",
    async (id) => {
      const result = await request(app).put(`/api/expenses/${id}`).send({
        amount: 10,
        category: "Food",
        description: "Test",
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: "Invalid expense id" });
    },
  );
  it("Verify status 404 for Route not found", async () => {
    const result = await request(app).get("/api/unknown");

    expect(result.status).toBe(404);
    expect(result.body).toEqual({ message: "Route not found" });
  });
});
