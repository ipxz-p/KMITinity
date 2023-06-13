import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        require: true
    },
    roles:{
        type: String,
        default: 'member'
    }
})

export default mongoose.model("user", userSchema)