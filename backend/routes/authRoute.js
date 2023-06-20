import express from 'express'
import { changePassword, login, logout, refresh, register, sendOTP } from '../controllers/authController.js'

const router = express.Router()
router.post('/reg', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/refresh', refresh)
router.post('/sendOTP', sendOTP)
router.put('/changePassword', changePassword)

export default router