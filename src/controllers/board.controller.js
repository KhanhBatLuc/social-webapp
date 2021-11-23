import { createNew } from "*/models/board"
import { statusCode } from "*/untilities/contants"
const newBoard = async (req, res) => {
    const data = await createNew(req.body)
  
      res.json(data);
}

const show = (req, res) => {
    res.status(statusCode.OK).json({'status':'OK'})
}
export const boardController = {
    newBoard,
    show
}