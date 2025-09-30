import Joi from "joi";

// Create notification validation
const createSchema = Joi.object({
  userId: Joi.string().uuid().required().messages({
    "string.guid": "validation.userId_format",
    "any.required": "validation.userId_required",
  }),
  title: Joi.string().required().min(1).max(200).messages({
    "string.required": "validation.title_required",
    "string.min": "validation.title_min",
    "string.max": "validation.title_max",
  }),
  message: Joi.string().required().min(1).max(1000).messages({
    "string.required": "validation.message_required",
    "string.min": "validation.message_min",
    "string.max": "validation.message_max",
  }),
  type: Joi.string()
    .valid("info", "warning", "error", "success")
    .required()
    .messages({
      "any.only": "validation.type_invalid",
      "any.required": "validation.type_required",
    }),
});

export const validateCreate = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = createSchema.validate(doc, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
};

// Mark as read validation
const markAsReadSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "validation.id_format",
    "any.required": "validation.id_required",
  }),
});

export const validateMarkAsRead = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = markAsReadSchema.validate(doc, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
};

// Delete validation
const deleteSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "validation.id_format",
    "any.required": "validation.id_required",
  }),
});

export const validateDelete = async (doc: any): Promise<Partial<any>> => {
  const { error, value } = deleteSchema.validate(doc, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
};