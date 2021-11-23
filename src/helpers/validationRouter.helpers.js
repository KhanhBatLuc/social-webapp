import Joi from "joi";
import { statusCode } from "*/untilities/contants";

/**
 * 
 * @param {*objet req.body} schema 
 * @returns 
 */

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body,{ abortEarly: false })

        if (validatorResult.error) {            
            return res.status(statusCode.BAD_REQUEST).json({ code: statusCode.BAD_REQUEST,  error: validatorResult.error.details})            
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}
            req.value.body = validatorResult.value
            next()
        }
    }
}






module.exports = {
    validateBody,
}