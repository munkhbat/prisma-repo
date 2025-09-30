import { Response } from "express";
import { HTTP_STATUS_CODES } from "./consts";

export const errorHandler = (res: Response, err: any) => {
  console.error("Error:", err);

  return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
    success: false,
    message: err.message || "An error occurred",
  });
};