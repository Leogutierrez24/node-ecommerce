import Joi from "joi";

const id = Joi.string().uuid();
const user = Joi.string().alphanum().min(5).max(20);
const password = Joi.string();

export const getUserSchema = Joi.object({

});
