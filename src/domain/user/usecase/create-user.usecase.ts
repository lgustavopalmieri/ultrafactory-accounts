// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { User } from '../entity/user.entity'
import type { UserRepositoryInterface } from '../repository/user.repository.interface'

interface InputCreateUserUseCaseInterface {
  user_name: string
  user_last_name: string
  user_email: string
  user_password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    user_name,
    user_last_name,
    user_email,
    user_password
  }: InputCreateUserUseCaseInterface) {
    const userExists = await this.userRepository.findByEmail(user_email)
    if (userExists) {
      throw new Error('User already exists')
    }
    const newUser = await User.create({
      user_name,
      user_last_name,
      user_email,
      user_password
    })
    try {
      await this.userRepository.create(newUser)
      return newUser
    } catch (error) {
      throw error
    }
  }
}
