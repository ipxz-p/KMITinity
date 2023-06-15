import user from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
    const duplicate = await user.findOne({email}).exec()
    if(duplicate){
        return res.status(409).json({ message: 'Duplicate email' })
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
                "role": User.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )
    const refreshToken = jwt.sign(
        { "username": User.username },
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
            const foundUser = user.findOne({username: decoded.username}).exec()
            if(!foundUser) return res.status(401).json({ message: 'Unauthorized' })
            const accessToken = jwt.sign(
                {
                "UserInfo": {
                    "username": decoded.username,
                    "roles": decoded.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            res.json({ accessToken })
        }
    )
}