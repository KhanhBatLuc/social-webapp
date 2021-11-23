import express from "express";

import { boardRoute } from "./board.route"
import { authRouter } from "./auth.route"
import { validateBody } from "*/helpers/validationRouter.helpers";
import { schemas } from "*/validations/broad.request";
// call router express
const router = express.Router()

// define router authentication with login logout jwt
router.use('/auth',authRouter)

// define and divide boards converst to small router
router.use('/boards', validateBody(schemas.boardCollectionSchema), boardRoute)

export const api = router