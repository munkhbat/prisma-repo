import { Request } from "express";
import i18n from "i18n";

export class LocaleMiddleware {
  /**
   * Extract and set locale from request headers
   * Defaults to 'mn' if not provided
   */
  static async getLocale(req: Request): Promise<string> {
    try {
      const lang = req.headers.lang?.toString().trim() || "mn";
      i18n.setLocale(lang);
      return lang;
    } catch (error) {
      // Default to 'mn' if any error occurs
      i18n.setLocale("mn");
      return "mn";
    }
  }
}