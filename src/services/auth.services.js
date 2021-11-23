import { users } from "*/models/users"
import bcrypt from "bcrypt"
import { env } from "*/config/enviroment"
import { Jwt } from "*/helpers/jwt.helpers"
import createError from "http-errors"
/**
 * const Check mail = boolean
 * if checkMail = true , don't have an emailed
 * else has been an emailed
 */
const createUserService = async(param) => {
    try {
        const modify = {...param}
        const salt = await bcrypt.genSalt(8)
        // now we set user password to hashed password
        modify.password = await bcrypt.hash(modify.password, salt)
        delete modify.confirmPassword
        // check mail exits
        const checkMail = await users.checkEmail(param.email)
        if (!checkMail) return { mess: "exits email !" }
        // create users
        const data = await users.createUser(modify)
       return data
   } catch (error) {
       throw new Error(error.message)
   }
}

const loginService = async(param) => {
    try {
         // check email and password
        const user = await users.Login(param.email)
        if (!user) return createError([401],'Email not exits')
        // 
        const checkpass = await bcrypt.compare(param.password, user.password)
        if(!checkpass)  return createError([401],'Password fail')
        // create generate access token
        // beside the generateToken have 3 parameter (sercertkey, data , expiresIn time)
        const accessToken = await Jwt.generateToken(env.ACCESS_TOKEN_SECRET, user, env.ACCESS_TOKEN_TIME)
        // after create accessToken , i will create another key (refresh token)
        const refreshToken = await Jwt.generateToken(env.REFRESH_TOKEN_SECRET, user, env.REFRESH_TOKEN_TIME)
        // cobinew accessToken and refreshToken and then save in the database or something....
        const tokenList = {accessToken, refreshToken};
        // save to the db
        const saveToken = await users.saveListToken(tokenList , user._id)
        if (!saveToken) return createError([401],'Error generate token')
        // if save success token
        return tokenList

    } catch (error) {
        throw new Error(error.message)
    }
}


export const authServices = {
    loginService,
    createUserService
    
}