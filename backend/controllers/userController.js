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

export const updateUser = async (req, res) => {
    const {
        email,
        username
    } = req.body
    const User = await user.findOne({email}).exec()
    if (!User) {
        return res.status(400).json({ message: 'User not found' })
    }
    if(req.files.length){
        User.profileImgPath = req.files[0].originalname
    }
    if(email !== ''){
        User.email = email
    }
    if(username !== ''){
        User.username = username
    }
    console.log(username);
    await User.save()
    return res.status(200).json({message: "Success"})
}
export const getAllUser = async (req, res) => {
    // const User = await user.find().updateMany({}, { $set: { profileImgPath: 'defaultImg.jpg' } })
    // user.updateMany({}, {$set:{profileImgPath: 'defaultImg.jpg'}})
    const User = await user.find().select("-password").lean()
    if (!User?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    res.status(200).json(User)
}