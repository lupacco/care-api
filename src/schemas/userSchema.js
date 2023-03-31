import Joi from "joi";

export const userSchema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})