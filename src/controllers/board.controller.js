import {boardServices} from "*/services/board.services"
import { statusCode } from "*/untilities/contants"
const newBoard = async (req, res) => {
   try {
       
       let data = await boardServices.newBoardService(req.body)
       res.json(data)
       
   } catch (error) {
       return res.json(error)
   }
}


export const boardController = {
    newBoard
}