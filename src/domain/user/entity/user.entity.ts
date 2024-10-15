// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { v4 as uuid } from 'uuid'
import type { UserEntityCreateInput, UserEntityInterface } from './interfaces'
import { UserEntityValidator } from './user.validator'
import { PasswordManager } from '../../@shared/password-manager/password.manager'

export class User implements UserEntityInterface {
  readonly user_id: number | string
  readonly user_name: string
  readonly user_last_name: string
  readonly user_email: string
  readonly user_password: string
  readonly created_at: Date
  readonly updated_at: Date
  readonly deleted_at: null | Date

  constructor({
    user_id,
    user_name,
    user_last_name,
    user_email,
    user_password,
    created_at,
    updated_at,
    deleted_at
  }: UserEntityInterface) {
    this.user_id = user_id ?? uuid()
    this.user_name = user_name
    this.user_last_name = user_last_name
    this.user_email = user_email
    this.user_password = user_password
    this.created_at = created_at ?? new Date()
    this.updated_at = updated_at ?? new Date()
    this.deleted_at = deleted_at ?? null
  }

  public static async create(input: UserEntityCreateInput): Promise<User> {
    const password = await PasswordManager.validateAndHashPassword(
      input.user_password
    )
    const newUser = new User({
      user_name: input.user_name,
      user_last_name: input.user_last_name,
      user_email: input.user_email,
      user_password: password
    })
    await UserEntityValidator.validate(newUser)
    return newUser
  }
}
