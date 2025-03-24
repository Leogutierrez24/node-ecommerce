import Joi from "joi";

const id = Joi.number();
const email = Joi.string().alphanum().min(5).max(20);
const password = Joi.string();

export const getUserSchema = Joi.object({
  userId: id.required()
});

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

export const updatePasswordSchema = Joi.object({
  newPassword: password.required(),
  actualPassword: password.required()
});
