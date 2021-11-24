import { users } from "*/models/users"
import bcrypt from "bcrypt"
import { env } from "*/config/enviroment"
import { Jwt } from "*/helpers/jwt.helpers"
import createError from "http-errors"
import client from "*/config/redis"

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
        if (!checkMail) throw createError(400, 'Email exits')
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
        if (!user) throw createError(400, 'Email not exits')
        // 
        const checkpass = await bcrypt.compare(param.password, user.password)
        if(!checkpass)  throw createError(400,'Password fail')
        // create generate access token
        // beside the generateToken have 3 parameter (sercertkey, data , expiresIn time)
        const accessToken = await Jwt.generateToken(env.ACCESS_TOKEN_SECRET, user, env.ACCESS_TOKEN_TIME)
        // after create accessToken , i will create another key (refresh token)
        const refreshToken = await Jwt.generateToken(env.REFRESH_TOKEN_SECRET, user, env.REFRESH_TOKEN_TIME)
        // cobinew accessToken and refreshToken and then save in the database or something....
        const tokenList = {accessToken, refreshToken};
        // save to the db REDIS
        // const saveToken = await users.saveListToken(tokenList , user._id)
        // if (!saveToken) throw createError(400,'Error generate token')
        client.set(user._id.toString(), refreshToken, 'Ex', 365*24*60*60 , (err, token) => {
            if (err) {
                throw createError.InternalServerError(err)
            }
        })
        // if save success token       
            return tokenList
        

    } catch (error) {
        throw new Error(error.message)
    }
}

const refreshTokenService = async(user) => {
    try {

          // create generate access token
        // beside the generateToken have 3 parameter (sercertkey, data , expiresIn time)
        const accessToken = await Jwt.generateToken(env.ACCESS_TOKEN_SECRET, user, env.ACCESS_TOKEN_TIME)
        // after create accessToken , i will create another key (refresh token)
        const refreshToken = await Jwt.generateToken(env.REFRESH_TOKEN_SECRET, user, env.REFRESH_TOKEN_TIME)
        // cobinew accessToken and refreshToken and then save in the database or something....
        const tokenList = { accessToken, refreshToken };
          // save to the db REDIS
        // const saveToken = await users.saveListToken(tokenList , user._id)
        // if (!saveToken) throw createError(400,'Error generate token')
        client.set(user._id.toString(), refreshToken, 'Ex', 365*24*60*60 , (err, token) => {
            if (err) {
                throw createError.InternalServerError(err)
            }
        })

        return tokenList
    } catch (error) {
        throw new Error(error.message)
    }
}

const logOutRervice = async(user) => {
    try {
        // delete data redis
        client.del(user._id.toString(), (err, token) => {
            if (err) {
                throw createError.InternalServerError()
            }           
        })
        return {
            status: 200,
            message:'logout success'
        }
        
    } catch (error) {
        throw new Error(error.message)
    }
}


export const authServices = {
    loginService,
    createUserService,
    refreshTokenService,
    logOutRervice
    
}