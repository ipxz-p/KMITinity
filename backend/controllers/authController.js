import user from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import OTPForm from '../public/views/OTPForm.js' 

export const register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    if(!username || !password || !email){
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    const duplicateEmail = await user.findOne({email}).exec()
    const duplicateUsername = await user.findOne({username}).exec()
    if(duplicateEmail){
        return res.status(409).json({ message: 'Duplicate email' })
    }
    if(duplicateUsername){
        return res.status(409).json({ message: 'Duplicate username' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const User = await user.create({
        username: username,
        email: email,
        password: hashPassword
    })
    if(User){
        res.status(201).json({
            message: 'Success'
        })
    }else{
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    if(!password || !email){
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    const User = await user.findOne({email}).exec()
    if(!User) return res.status(401).json({message: 'Email or password incorrect'})
    const match = await bcrypt.compare(password, User.password)
    if(!match) return res.status(401).json({message: 'Email or password incorrect'})
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": User.username,
                "email": User.email,
                "roles": User.roles,
                "profileImgPath": User.profileImgPath
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )
    const refreshToken = jwt.sign(
        { "email": User.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ accessToken })
}

export const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

export const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if(err)  return res.status(403).json({ message: 'Forbidden' })
            const foundUser = await user.findOne({email: decoded.email}).exec()
            if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })
            const accessToken = jwt.sign(
                {
                "UserInfo": {
                    "username": foundUser.username,
                    "email": foundUser.email,
                    "roles": foundUser.roles,
                    "profileImgPath": foundUser.profileImgPath
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        }
    )
}

export const sendOTP = (req, res) => {
    const {
        recipient_email,
        OTP
    } = req.body
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });
    const mail_configs = {
        from: process.env.MY_EMAIL,
        to: recipient_email,
        subject: "KMITinity Password Recovery",
        html: OTPForm(OTP),
    };
    transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: `An error has occured` });
        }
        return res.status(200).json({ message: "Email sent succesfuly" });
    });
}

export const changePassword = async (req, res) => {
    const {
        email,
        newPassword
    } = req.body
    if(!email, !newPassword){
        return res.status(400).json({
            message: 'All fields are required'
        })
    }
    const User = await user.findOne({email}).exec()
    if (!User) {
        return res.status(400).json({ message: 'User not found' })
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)
    User.password = hashPassword
    await User.save()
    return res.status(200).json({message: 'Success'})
}