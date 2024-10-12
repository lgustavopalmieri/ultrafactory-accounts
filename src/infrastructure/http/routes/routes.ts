// src/presentation/routes/UserRoutes.ts
import { Router } from 'express'
import { UserController } from '../controllers/user/user.controller'

const router = Router()

router.post('/register', UserController.register)

export default router
