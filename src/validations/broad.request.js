import Joi from "joi";

const schemas = {

    boardCollectionSchema : Joi.object({
        title: Joi.string().required().min(10).max(20),
        columnOrder: Joi.array().items(Joi.string()).default([]),
        createdAt: Joi.date().timestamp().default(Date.now()),
        updatedAt: Joi.date().timestamp().default(null),
        deletedAt: Joi.boolean().default(false)
    })

}

module.exports = {
    schemas
}