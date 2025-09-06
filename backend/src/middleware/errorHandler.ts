import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  // Log error with stack trace
  logger.error(`${req.method} ${req.url} - ${status} - ${message}`, {
    stack: err.stack,
  });
  res.status(status).json({
    success: false,
    message,
  });
};
