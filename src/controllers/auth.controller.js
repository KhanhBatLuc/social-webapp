import { authServices } from "*/services/auth.services";
import { statusCode } from "*/untilities/contants";

const createUsers = async(req, res,next) => {
   try {
       let data = await authServices.createUserService(req.body)
        return res.status(statusCode.OK).json(data)
   } catch (error) {
        next(error)
   }
}

const login = async (req, res,next) => {
    try {
        let data = await authServices.loginService(req.body)
        return res.status(statusCode.OK).json(data)
    } catch (error) {      
        next(error)
    }
}

const refreshToken = async(req, res, next) => {
    try {
        let data = await authServices.refreshTokenService(req.dataRef)
        return res.status(statusCode.OK).json(data)
    } catch (error) {
        next(error)
    }
}
const logout = async(req, res, next) => {
    try {
        let data = await authServices.logOutRervice(req.dataRef)
        return res.status(statusCode.OK).json(data)
        
    } catch (error) {
        next(error)
    }
}
export const authController = {
    createUsers,
    login,
    refreshToken,
    logout
}