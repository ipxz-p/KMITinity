import express from 'express'
import { login, logout, refresh, register } from '../controllers/authController.js'

const router = express.Router()
router.post('/reg', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', refresh)

export default router