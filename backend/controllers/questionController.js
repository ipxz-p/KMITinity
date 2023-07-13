import question from "../models/question.js";
import user from "../models/user.js";
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
        tags = [],
    } = req.body
    
    if(!title || title === '' || !description || description === ''){
        return res.status(400).json({message: 'Please enter title and description'})
    }
    const images = req.files.map((file) => file.originalname);
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

export const getAllQuestion = async (req, res) => {
    const Question = await question.find().populate({
        path: 'owner',
        select: 'profileImgPath username'
    }).lean()
    const curDate = new Date;
    const modifiedQuestions = Question.map((question) => {
        const createdAt = new Date(question.createdAt);
        const timeDifference = Math.floor((curDate - createdAt) / 60000)
        if (timeDifference < 1) {
            question.createdAt = 'Just now';
        } else if (timeDifference < 60) {
            question.createdAt = `${timeDifference} minutes ago`;
        } else if (timeDifference < 1440) {
            const hours = Math.floor(timeDifference / 60);
            question.createdAt = `${hours} hours ago`;
        } else if (timeDifference < 43200) {
            const days = Math.floor(timeDifference / 1440);
            question.createdAt = `${days} days ago`;
        } else if (timeDifference < 525600) {
            const months = Math.floor(timeDifference / 43200);
            question.createdAt = `${months} months ago`;
        } else {
            const years = Math.floor(timeDifference / 525600);
            question.createdAt = `${years} years ago`;
        }
        return question;
    })
    res.status(200).json(modifiedQuestions)
}
export const addComment = async (req, res) => {
    const {
        comment,
        commentId,
        username,
        profileImgPath,
    } = req.body
    

}