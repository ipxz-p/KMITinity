import express from 'express'
import { addComment, addLike, createQuestion, getAllQuestion, updateQuestion, upload, viewQuestion } from '../controllers/questionController.js'
const router = express.Router()
router.post('/createQuestion', upload.array('images'), createQuestion)
router.get('/getAllQuestion', getAllQuestion)
router.post('/addComment', addComment)
router.post('/addLike', addLike)
router.post('/viewQuestion', viewQuestion)
router.post('updateQuestion', updateQuestion)

export default router