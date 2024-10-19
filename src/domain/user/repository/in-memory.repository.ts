// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import type { User } from '../entity/user.entity'
import type { UserRepositoryInterface } from './user.repository.interface'

export class InMemoryUserRepository implements UserRepositoryInterface {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.user_email === email) || null
  }

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  clear(): void {
    this.users = []
  }
}
