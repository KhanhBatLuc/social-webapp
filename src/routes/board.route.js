import express from "express"
import { boardController } from "*/controllers/board.controller"

const router = express.Router()

router.route('/abc')
.get(boardController.newBoard)


export const boardRoute = router
