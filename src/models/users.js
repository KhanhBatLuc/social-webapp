import Joi from "joi";
import { getDB } from "*/config/mongodb";
import bcrypt from "bcrypt"
const usersCollection = 'users'

// create Schema

const commonRequired = {
    stringAlphanum: Joi.string().required().alphanum().max(255).trim(),
    string: Joi.string().required().max(255).trim()
    
}

const usersCollectionSchema = Joi.object({
    name: commonRequired.stringAlphanum.min(6).max(30),
    email:commonRequired.string.email(),
    password: commonRequired.string.min(6).max(255),
    confirmPassword: Joi.string().min(6).max(255).valid(Joi.ref('password')),
    phone: Joi.number(),
    avatar: Joi.string().max(255),
    listPostId: Joi.array().items(Joi.string()).default([]),
    address: Joi.object({
        province:Joi.string(),
        district:Joi.string(),
        ward:Joi.string(),
        location:Joi.array().items(Joi.number()).default([])
    }),
    listFriends: Joi.array().items(Joi.string()).default([]),
    listIdRoomChat:Joi.array().items(Joi.string()).default([])

})

// validate Schema
const validateSchema = async (data) => {
    return await usersCollectionSchema.validateAsync(data, { abortEarly: false })
    
}

const createUser = async (data) => {
    try {
        const val = await validateSchema(data)
        const result = await getDB().collection(usersCollection).insertOne(val)
        return result
    } catch (error) {
        return error
    }
}

const checkEmail = async (email) => {
    try {
        let isCheck = false
        const result = await getDB().collection(usersCollection).findOne({ email: email })
        if (!result) {
            isCheck = true
        }
        return isCheck
    } catch (error) {
        return error
    }
}

const Login = async (email) => {
    try {
        const user = await getDB().collection(usersCollection).aggregate([
            { $match: { email: email } },
            { $project: { _id:1, name: 1, email: 1 ,password:1} }
        ]).toArray()
        if (!user) return false
        return user[0]
    
    } catch (error) {
        return error
    }
}

const saveListToken = async (token , id) => {
    try {

        const saveToken = await getDB().collection(usersCollection).updateOne(
            { _id:  id },
            {$set:{listToken:{'accessToken':token.accessToken,'refreshToken':token.refreshToken}}}
        )

        if (!saveToken.modifiedCount) return false

        return true
    } catch (error) {
        return error
    }
}



export const users = {
    createUser,
    checkEmail,
    Login,
    saveListToken

}