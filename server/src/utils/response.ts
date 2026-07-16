import { Response } from "express";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Send a success response.
 */
export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
): void {
  const response: ApiResponse<T> = { success: true, message, data: data ?? ({} as T) };
  res.status(statusCode).json(response);
}

/**
 * Send an error response.
 */
export function sendError<T>(
  res: Response,
  message: string,
  statusCode: number = 500,
  data?: T,
): void {
  const response: ApiResponse<T> = { success: false, message, data: data ?? ({} as T) };
  res.status(statusCode).json(response);
}

/**
 * Send a validation error response with formatted errors in data.
 */
export function sendValidationError(
  res: Response,
  errors: Record<string, string[]>,
): void {
  sendError(res, "Validation failed", 400, { errors });
}
