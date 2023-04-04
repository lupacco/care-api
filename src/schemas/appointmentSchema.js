import Joi from "joi";

export const appointmentSchema = Joi.object({
    date: Joi.string().required(),
    time: Joi.string().required()
})