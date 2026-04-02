import express from 'express'
import { Login } from '../../controllers/auth/login.js'

const router = express.Router()
router.post('/login', Login)
export default router




