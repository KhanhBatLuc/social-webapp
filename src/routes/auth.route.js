import express from "express"
import { authController } from "*/controllers/auth.controller"
import { validateBody } from "*/middlewares/validationRouter.helpers";
import { checkToken } from "*/middlewares/checkToken.middleware";
import { schemas } from "*/validations/users.request";

const router = express.Router()
//create users
router.post("/create-account", validateBody(schemas.usersCollectionSchema), authController.createUsers)


/**
 * ValidateBody this is the middlwares check Input
 */

// login
router.post("/login", validateBody(schemas.userLoginSchema), authController.login)
// logout
router.delete("/logout", checkToken.isRefreshToken, authController.logout)
// refresh Token
router.post("/refresh-token", checkToken.isRefreshToken, authController.refreshToken)


export const authRouter = router