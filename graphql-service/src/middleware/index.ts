/**
 * Middleware exports
 * Centralized export for all middleware functions
 */

export { AuthMiddleware } from "./auth.middleware";
export { LocaleMiddleware } from "./locale.middleware";

// Legacy exports for backward compatibility
import { Request } from "express";
import { IContextUser } from "../utils/interfaces/common";
import { AuthMiddleware } from "./auth.middleware";
import { LocaleMiddleware } from "./locale.middleware";

export const authTokenMiddleware = async (
  req: Request
): Promise<IContextUser | null> => {
  return await AuthMiddleware.authenticateUser(req);
};

export const localeMiddleware = async (req: Request): Promise<string> => {
  return await LocaleMiddleware.getLocale(req);
};
