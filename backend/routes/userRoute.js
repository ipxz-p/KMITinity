import express from 'express'
import { getAllUser, updateUser, upload } from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()
// router.use(verifyJWT)
router.get('/getAllUser', getAllUser)
router.put('/updateUser', upload.array('images'), updateUser)

export default router