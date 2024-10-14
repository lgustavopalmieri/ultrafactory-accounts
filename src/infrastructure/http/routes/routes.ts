// src/presentation/routes/UserRoutes.ts
import { Router } from 'express'
import { UserController } from '../controllers/user/user.controller'
import { KeycloakController } from '../controllers/keycloak/create-realm'
const router = Router()

router.post('/register', UserController.register)
router.post('/realms', KeycloakController.createRealm)

export default router
