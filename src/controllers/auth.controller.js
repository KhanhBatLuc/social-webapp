import { authServices } from "*/services/auth.services";
import { statusCode } from "*/untilities/contants";

const createUsers = async(req, res) => {
   try {
    let data = await authServices.createUserService(req.body)
    res.status(statusCode.OK).json(data)
   } catch (error) {
    res.status(statusCode.BAD_REQUEST).json(error)
   }
}

const login = async (req, res,next) => {
    try {
        let data = await authServices.loginService(req.body)
        res.status(statusCode.OK).json(data)
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).json(error)
    }
}
export const authController = {
    createUsers,
    login
}