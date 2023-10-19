import Joi = require('joi');

export const teacherCreateSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
})

export const teacherUpdateSchema = Joi.object({
    first_name: Joi.string().min(3),
    last_name: Joi.string().min(3)
}).min(1)