import express from 'express'
import { getAllUser } from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()
router.use(verifyJWT)
router.get('/getAllUser', getAllUser)

export default router