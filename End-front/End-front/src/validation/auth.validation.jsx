import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.required":" username is required",
    }),
    password: Joi.string().required()
})

//validation ist Joi 

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        "string.empty":"username is not allowed to be empty",
    }),
    password: Joi.string().required().pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/).messages({
        "string.pattern.base":"password is not valid",
    }),
    fullName : Joi.string().required()
})
