import { User } from '../entity/user.entity'
import type { UserRepositoryInterface } from '../repository/user.repository'

interface InputCreateUserUseCaseInterface {
  name: string
  last_name: string
  email: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    name,
    last_name,
    email,
    password
  }: InputCreateUserUseCaseInterface) {
    const userExists = await this.userRepository.findByEmail(email)
    if (userExists) {
      throw new Error('User already exists')
    }
    await this.userRepository.create(
      new User({
        name,
        last_name,
        email,
        password
      })
    )
  }
}
