import { createNew } from "*/models/board"

const newBoardService = async(data) => {
    try {

        const res = await createNew(data)  
        return res
    } catch (error) {
       console.log(error);
    }
}

const show = (req, res) => {
    res.status(statusCode.OK).json({'status':'OK'})
}


export const boardServices = {
    newBoardService,
    show
}