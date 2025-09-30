import { Response } from "express";
import i18n from "i18n";
import { HTTP_STATUS_CODES } from "./consts";
// error handler
export const errorHandler = (res: Response, err: any): object => {
  const checkJson = (errorMessage: string) => {
    try {
      const i18nParse = JSON.parse(errorMessage);
      if (i18nParse.isCustom) {
        return i18n.__(i18nParse.i18n);
      }
      return i18n.__mf(i18nParse.i18n, {
        fieldName: i18n.__(i18nParse.fieldName),
        minLength: i18nParse.minLength,
        maxLength: i18nParse.maxLength,
      });
    } catch (err) {
      return errorMessage;
    }
  };

  try {
    return res
      .status(err.statusCode ? err.statusCode : HTTP_STATUS_CODES.OK)
      .json({
        success: false,
        message: checkJson(err.message.split("Validation error: ").pop()),
      });
  } catch (error: any) {
    return res
      .status(error.statusCode ? error.statusCode : HTTP_STATUS_CODES.OK)
      .json({
        success: false,
        message: error.message,
      });
  }
};
