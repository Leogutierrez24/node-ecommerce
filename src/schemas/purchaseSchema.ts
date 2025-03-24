import Joi from "joi";
import { purchaseItemSchema } from "./purchaseItemSchema";

const id = Joi.number();
const products = Joi.array().items(purchaseItemSchema).min(1);

export const getPurchaseSchema = Joi.object({
  id: id.required(),
});

export const newPurchaseSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  products: products.required()
});
