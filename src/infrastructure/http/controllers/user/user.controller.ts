// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import type { Request, Response } from 'express'
import { CreateUserUseCase } from '../../../../domain/user/usecase/create-user.usecase'
import { UserRepository } from '../../../database/postgres/user/user.repository.db'
import { productionDatabase } from '../../../database/postgres/postgres.client'

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const { user_name, user_last_name, user_email, user_password } = req.body

    const userRepository = new UserRepository(productionDatabase)
    const registerUser = new CreateUserUseCase(userRepository)

    try {
      await registerUser.execute({
        user_name,
        user_last_name,
        user_email,
        user_password
      })
      res.status(201).json({ message: 'User registered successfully' })
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
