// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import type pgPromise from 'pg-promise'
import { User } from '../../../../domain/user/entity/user.entity'
import type { UserRepositoryInterface } from '../../../../domain/user/repository/user.repository.interface'
import type pg from 'pg-promise/typescript/pg-subset'

export class UserRepository implements UserRepositoryInterface {
  private readonly db: pgPromise.IDatabase<object, pg.IClient>
  constructor(dbConnection: pgPromise.IDatabase<object, pg.IClient>) {
    this.db = dbConnection
  }
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1'
    const user = await this.db.oneOrNone(query, [email])

    if (user) {
      return User.load(user)
    }

    return null
  }

  async create(user: User): Promise<User> {
    const query =
      'INSERT INTO users (user_name, user_last_name, user_email, user_password) VALUES ($1, $2, $3, $4)'
    const newUser = await User.create({
      user_name: user.user_name,
      user_last_name: user.user_last_name,
      user_email: user.user_email,
      user_password: user.user_password
    })

    await this.db.none(query, [
      newUser.user_name,
      newUser.user_last_name,
      newUser.user_email,
      newUser.user_password
    ])

    return newUser
  }
}
