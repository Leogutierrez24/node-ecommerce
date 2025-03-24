import Joi from "joi";

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(30);

export const createUpdateCategorySchema = Joi.object({
  name: name.required(),
});

export const getCategorySchema = Joi.object({
  id: id.required(),
});

export const categorySchema = Joi.object({
  id: id.required(),
  name: name.required()
});
