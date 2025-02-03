import Joi from "joi";
import { createUpdateCategorySchema } from "./categorySchema";

const id = Joi.number();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(0);

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  categories: createUpdateCategorySchema.optional(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});
