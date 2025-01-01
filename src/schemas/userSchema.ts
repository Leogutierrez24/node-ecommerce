import Joi from "joi";

const id = Joi.string().uuid();
const user = Joi.string().alphanum().min(5).max(20);
const password = Joi.string();

export const getUserSchema = Joi.object({
  id: id.required()
});

export const createUserSchema = Joi.object({
  user: user.required(),
  password: password.required()
});

export const updatePasswordSchema = Joi.object({
  newPassword: password.required(),
  oldPassword: password.required()
});
