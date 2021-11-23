import Joi from "joi";
import { statusCode } from "*/untilities/contants";
const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body,{ abortEarly: false })

        if (validatorResult.error) {
            return res.status(400).json({ error: validatorResult.error.message })
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