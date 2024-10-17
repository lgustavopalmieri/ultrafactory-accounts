// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________

import { IsNotEmpty, IsEmail, IsString, validate } from 'class-validator'
import type { Email } from './email'

export class EmailValidator {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string

  constructor(input: Email) {
    Object.assign(this, input)
  }

  static async validate(input: Email): Promise<void> {
    const dto = new EmailValidator(input)
    const errors = await validate(dto)

    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints ?? {}).join(', '))
        .join('\n')
      throw new Error(errorMessages)
    }
  }
}
