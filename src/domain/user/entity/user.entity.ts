// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { v4 as uuid } from 'uuid'
import type {
  UserEntityCreateInput,
  UserEntityInterface,
  UserEntityUpdateInput
} from './interfaces'
import { UserEntityValidator } from './user.validator'
import { Email } from '../../@shared/value-objects/email/email'
import { Password } from '../../@shared/value-objects/password/password'

export class User implements UserEntityInterface {
  readonly user_id: number | string
  readonly user_name: string
  readonly user_last_name: string
  readonly user_email: string
  readonly user_password: string
  readonly user_created_at: Date
  readonly user_updated_at: Date
  readonly user_deleted_at: null | Date

  private constructor(input: UserEntityInterface) {
    this.user_id = input.user_id ?? uuid()
    this.user_name = input.user_name
    this.user_last_name = input.user_last_name
    this.user_email = input.user_email
    this.user_password = input.user_password
    this.user_created_at = input.user_created_at
    this.user_updated_at = input.user_updated_at
    this.user_deleted_at = input.user_deleted_at
  }

  //---------------------------------------------------------\\
  // should be created an specific method for password change \\
  //-----------------------------------------------------------\\

  public static async create(input: UserEntityCreateInput): Promise<User> {
    const password = new Password(input.user_password).getValue()
    const email = new Email(input.user_email).getValue()
    const newUser = new User({
      user_name: input.user_name,
      user_last_name: input.user_last_name,
      user_email: email,
      user_password: password,
      user_created_at: new Date(),
      user_updated_at: new Date(),
      user_deleted_at: null
    })
    await UserEntityValidator.validate(newUser)
    return newUser
  }

  public static load(input: UserEntityInterface): User {
    const newUser = new User(input)
    UserEntityValidator.validate(newUser)
    return newUser
  }

  public static async update({
    user,
    input
  }: UserEntityUpdateInput): Promise<User> {
    const updatedEmail = input.user_email
      ? new Email(input.user_email).getValue()
      : user.user_email

    const updatedPassword = input.user_password
      ? new Password(input.user_password).getValue()
      : user.user_password

    const updatedUser = new User({
      user_id: user.user_id,
      user_name: input.user_name ?? user.user_name,
      user_last_name: input.user_last_name ?? user.user_last_name,
      user_email: updatedEmail,
      user_password: updatedPassword,
      user_created_at: user.user_created_at,
      user_updated_at: new Date(),
      user_deleted_at: input.user_deleted_at ?? user.user_deleted_at
    })
    await UserEntityValidator.validate(updatedUser)
    return updatedUser
  }
}
