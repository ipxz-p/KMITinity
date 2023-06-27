import express from 'express'
import { createQuestion, upload } from '../controllers/questionController.js'
const router = express.Router()
router.post('/createQuestion', upload.array('images'), createQuestion)

export default router