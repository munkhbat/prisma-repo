import Joi from "joi";

// User registration validation
const registerSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50).messages({
    "string.required": "error.validation.firsName_required",
    "string.min": "error.validation.min",
    "string.max": "error.validation.max",
  }),
  lastName: Joi.string().required().min(2).max(50).messages({
    "string.required": "error.validation.lastName_required",
    "string.min": "error.validation.min",
    "string.max": "error.validation.max",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "validation.email_format",
    "string.empty": "validation.email_required",
    "any.required": "validation.email_required",
  }),
  password: Joi.string().length(8).required().messages({
    "string.password": "validation.password_format",
  }),
});

export const validateRegister = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = registerSchema.validate(doc, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(
      JSON.stringify({
        isCustom: true,
        i18n: error.details[0].message,
      })
    );
  }

  const filtered = Object.fromEntries(
    Object.entries(value).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  return filtered;
};

// User login validation
const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "validation.email_format",
    "string.empty": "validation.email_required",
    "any.required": "validation.email_required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "validation.password_required",
    "any.required": "validation.password_required",
  }),
});

export const validateLogin = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = loginSchema.validate(doc, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(
      JSON.stringify({
        isCustom: true,
        i18n: error.details[0].message,
      })
    );
  }

  const filtered = Object.fromEntries(
    Object.entries(value).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  );
  return filtered;
};
