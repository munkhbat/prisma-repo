import Joi from "joi";

// Organization registration validation
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    "string.required": "error.validation.name",
    "string.min": "error.validation.min",
    "string.max": "error.validation.max",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "validation.email_format",
    "string.empty": "validation.email_required",
    "any.required": "validation.email_required",
  }),
  register: Joi.string().length(10).required().messages({
    "string.register": "validation.register_format",
  }),
});

export const validateCreateOrg = async (doc: any): Promise<Partial<any>> => {
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

// Add user to organization validation
const addUserSchema = Joi.object({
  organizationId: Joi.string().uuid().required().messages({
    "string.guid": "validation.organizationId_format",
    "any.required": "validation.organizationId_required",
  }),
  userId: Joi.string().uuid().required().messages({
    "string.guid": "validation.userId_format",
    "any.required": "validation.userId_required",
  }),
  role: Joi.string().required().min(2).max(50).messages({
    "string.required": "error.validation.role_required",
    "string.min": "error.validation.min",
    "string.max": "error.validation.max",
  }),
});

export const validateAddUser = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = addUserSchema.validate(doc, {
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
