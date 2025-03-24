import Joi from "joi";
import { categorySchema } from "./categorySchema";

const id = Joi.number().positive();
const name = Joi.string().min(3).max(30);
const price = Joi.number().positive();
const categories = Joi.array().items(categorySchema);

export const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  categories: categories.optional(),
});

export const updateProductSchema = Joi.object({
  name: name,
  price: price,
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const productSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  categories: categories.optional()
});
