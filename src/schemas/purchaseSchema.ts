import Joi from "joi";

const id = Joi.string().uuid();

export const getPurchaseSchema = Joi.object({
  id: id.required(),
});
