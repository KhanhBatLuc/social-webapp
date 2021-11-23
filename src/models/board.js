import Joi from "joi";
import { getDB } from "*/config/mongodb";

const boardCollection = 'users'
// declacre vaidation req
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    deletedAt: Joi.boolean().default(false)

})

//validate data from boarCollectionSchema
const validateSchema = async(data) => {
    return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
    
}
export const  createNew = async(data) => {
    try {
        const val = await validateSchema(data)
        const result = await getDB().collection(boardCollection).insertOne(val)
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
