import Joi from "joi";

// Add user to organization validation
const createSchema = Joi.object({
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

export const validateCreate = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = createSchema.validate(doc, {
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

// Remove user from organization validation
const removeSchema = Joi.object({
  organizationId: Joi.string().uuid().required().messages({
    "string.guid": "validation.organizationId_format",
    "any.required": "validation.organizationId_required",
  }),
  userId: Joi.string().uuid().required().messages({
    "string.guid": "validation.userId_format",
    "any.required": "validation.userId_required",
  }),
});

export const validateRemove = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = removeSchema.validate(doc, {
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