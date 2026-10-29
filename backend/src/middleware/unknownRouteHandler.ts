import type { RequestHandler } from "express";

export const unknownRouteHandler: RequestHandler = (_req, res, _next) => {
  res.status(404).json({ message: "Route not found" });
};
