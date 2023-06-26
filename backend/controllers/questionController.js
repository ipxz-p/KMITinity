import question from "../models/question";
export const createQuestion = async (req, res) => {
    const {
        title,
        description,
        userId,
        tags,
    } = req.body
    const img = req.files

}