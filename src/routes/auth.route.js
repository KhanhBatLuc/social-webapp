import express from "express"
import { authController } from "*/controllers/auth.controller"
import { validateBody } from "*/helpers/validationRouter.helpers";
import { schemas } from "*/validations/users.request";

const router = express.Router()
//create users
router.post("/create-account", validateBody(schemas.usersCollectionSchema), authController.createUsers)

// login
router.post("/login",validateBody(schemas.userLoginSchema),authController.login)

export const authRouter = router