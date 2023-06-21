import user from "../models/user.js";
export const getAllUser = async (req, res) => {
    const User = await user.find().updateMany({}, {$set:{profileImgPath: 'defaultImg.jpg'}})
    // user.updateMany({}, {$set:{profileImgPath: 'defaultImg.jpg'}})
    
    res.send(User)
}