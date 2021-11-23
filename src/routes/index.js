import express from "express";

import { boardRoute } from "./board.route"
import { boardController } from "*/controllers/board.controller";
import { validateBody } from "*/helpers/validationRouter.helpers";
import { schemas } from "*/validations/broad.request";
// call router express
const router = express.Router()

router.get('/test',boardController.show)

// define and divide boards converst to small router
router.use('/boards', validateBody(schemas.boardCollectionSchema), boardRoute)

export const api = router