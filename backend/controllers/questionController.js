import question from "../models/question.js";
import multer from 'multer'
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/img");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.originalname
        );
    },
});
export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }})
export const createQuestion = async (req, res) => {
    const {
        title,
        description,
        owner,
        tags,
    } = req.body
    if(!title || title === '' || !description || description === ''){
        return res.status(400).json({message: 'Please enter title and description'})
    }
    const images = req.files
    const Question = await question.create({
        title,
        description,
        owner,
        ...(tags.length && {tags}),
        ...(images.length && {images}),
    })
    if(Question){
        res.status(200).json({message: 'Success'})
    }else{
        res.status(400).json({message: 'Error occured'})
    }
}