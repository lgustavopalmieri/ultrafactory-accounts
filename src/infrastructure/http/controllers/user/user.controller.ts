// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import type { Request, Response } from 'express'
import { CreateUserUseCase } from '../../../../domain/user/usecase/create-user.usecase'
import { UserRepository } from '../../../database/postgres/user/user.repository.db'
import { productionDatabase } from '../../../database/postgres/postgres.client'
import {
  errorResponse,
  successResponse
} from '../helpers/apis-response.helpers'

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const { user_name, user_last_name, user_email, user_password } = req.body

    const userRepository = new UserRepository(productionDatabase)
    const registerUser = new CreateUserUseCase(userRepository)

    try {
      const newUser = await registerUser.execute({
        user_name,
        user_last_name,
        user_email,
        user_password
      })
      // PASSWORD SHOULD NOT RETURN WHEN USER IS CREATED \\
      successResponse(res, newUser, 'User registered successfully')
    } catch (error: unknown) {
      const errMessage = (error as Error).message || 'Unexpected error'
      errorResponse(res, errMessage, 400)
    }
  }
}
