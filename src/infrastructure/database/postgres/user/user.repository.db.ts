import { User } from '../../../../domain/user/entity/user.entity'
import type { UserRepositoryInterface } from '../../../../domain/user/repository/user.repository'
import db from '../postgres.client'

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1'
    const user = await db.oneOrNone(query, [email])

    if (user) {
      return new User({
        user_id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        password: user.password
      })
    }

    return null
  }

  async create(user: User): Promise<void> {
    const query =
      'INSERT INTO users (name, last_name, email, password) VALUES ($1, $2, $3, $4)'
    const newUser = new User({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    })

    await db.none(query, [
      newUser.name,
      newUser.last_name,
      newUser.email,
      newUser.password
    ])
  }
}
