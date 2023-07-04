import express from 'express'
import { createQuestion, getAllQuestion, upload } from '../controllers/questionController.js'
const router = express.Router()
router.post('/createQuestion', upload.array('images'), createQuestion)
router.get('/getAllQuestion', getAllQuestion)

export default router