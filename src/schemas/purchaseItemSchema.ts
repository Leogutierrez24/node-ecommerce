import Joi from "joi";
import { productSchema } from "./productSchema";

const quantity = Joi.number().integer().min(1);
const price = Joi.number().positive();

export const purchaseItemSchema = Joi.object({
  product: productSchema.required(),
  quantity: quantity.required(),
  price: price.required()
});
