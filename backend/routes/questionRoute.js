import express from 'express'
import { addComment, addLike, createQuestion, getAllQuestion, upload } from '../controllers/questionController.js'
const router = express.Router()
router.post('/createQuestion', upload.array('images'), createQuestion)
router.get('/getAllQuestion', getAllQuestion)
router.post('/addComment', addComment)
router.post('/addLike', addLike)

export default router