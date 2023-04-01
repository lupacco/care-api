import Joi from "joi";

export const userSchema = Joi.object({
    type: Joi.string().valid('doctor', 'patient').required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cpf: Joi.when('type', { is: 'patient', then: Joi.string().required(), otherwise: Joi.forbidden() }),
    crm: Joi.when('type', { is: 'doctor', then: Joi.string().required(), otherwise: Joi.forbidden()}),
    speciality: Joi.when('type', { is: 'doctor', then: Joi.string().required(), otherwise: Joi.forbidden() }),
  });