import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);

export const createUpdateCategorySchema = Joi.object({
  name: name.required(),
});

export const getCategorySchema = Joi.object({
  id: id.required(),
});
