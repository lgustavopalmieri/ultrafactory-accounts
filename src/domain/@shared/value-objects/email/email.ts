// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________

import type { EmailInterface } from './email.interface'
import { EmailValidator } from './email.validator'

export class Email {
  readonly email: string

  constructor({ email }: EmailInterface) {
    this.email = email
  }

  public static async create(input: EmailInterface): Promise<Email> {
    const newEmail = new Email(input)
    await EmailValidator.validate(newEmail)
    return newEmail
  }

  public getEmail(): string {
    return this.email
  }
}
