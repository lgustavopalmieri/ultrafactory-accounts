import type { Request, Response } from 'express'
import { CreateUserUseCase } from '../../../../domain/user/usecase/create.usecase'
import { UserRepository } from '../../../database/postgres/user/user.repository.db'

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    const { user_name, user_last_name, user_email, user_password } = req.body

    const userRepository = new UserRepository()
    const registerUser = new CreateUserUseCase(userRepository)

    try {
      await registerUser.execute({
        user_name,
        user_last_name,
        user_email,
        user_password
      })
      res.status(201).send('User registered successfully')
    } catch (error: unknown) {
      res.status(400).send(error)
    }
  }
}
