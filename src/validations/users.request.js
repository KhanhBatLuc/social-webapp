import Joi from "joi";

const commonRequired = {
    stringAlphanum: Joi.string().required().alphanum().max(255),
    string: Joi.string().required().max(255)
    
}

const schemas = {

    usersCollectionSchema : Joi.object({    
        name: commonRequired.stringAlphanum.min(6).max(30),
        email:commonRequired.string.email(),
        password: commonRequired.string.min(6).max(255),
        confirmPassword: commonRequired.string.min(6).valid(Joi.ref('password')),
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
    
    }),

    // schema validate with login
    userLoginSchema: Joi.object({
        email:commonRequired.string.email(),
        password:commonRequired.string.min(6).max(255)
    })

}

module.exports = {
    schemas
}