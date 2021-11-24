import createError from "http-errors"
import { Jwt } from "*/helpers/jwt.helpers"
import client from "*/config/redis"

const isRefreshToken = async(req, res, next) => {
    const tokenFromClient = req.headers.authorization?.split(" ")[1] || req.body.refreshToken
    if (tokenFromClient) {
        
        // if get token success -> verify token
        let error, result

        [error, result] = await handleRequest(Jwt.verifyToken(tokenFromClient))
        if (error) {
            const err = createError.Unauthorized(error)
            return next(err)
        }

        client.get(result.data._id, (error, reply) => {
            if (error) {
                const err = createError.InternalServerError(error)
                return next(err)
            }
            if (tokenFromClient === reply) {
                req.dataRef = result.data
                 next()
            }
            else {
                const err = createError.Unauthorized()
                return next(err)   
            }         
        })   
    } else {
        const error = createError.Forbidden('Invalid token :((')
         next(error)
    }
    
    
}

const handleRequest = promise => {
    return promise.then(data => ([undefined, data]))
        .catch(err => ([err, undefined]))
    
}

export const checkToken = {
    isRefreshToken
}   