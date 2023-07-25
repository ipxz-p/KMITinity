import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import mongoose, { connect } from 'mongoose';
import 'express-async-errors'; // for handler err
import connectDB from './config/db.js'
import path from 'path'
import { logger } from './middleware/logger.js';
import { fileURLToPath } from 'url';
import errHandler from './middleware/errHandler.js';
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import questionRoute from './routes/questionRoute.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3500
dotenv.config()
connectDB()
const app = express();
app.use(logger)
app.use(express.json());
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://kmitinity.onrender.com'
    ],
    credentials: true
}))

app.use('/', express.static(path.join(__dirname,)))
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/question', questionRoute)
app.use(errHandler)
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err);
})