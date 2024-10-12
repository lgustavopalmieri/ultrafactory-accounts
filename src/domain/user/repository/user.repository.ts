import type { User } from '../entity/user.entity'

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
}
