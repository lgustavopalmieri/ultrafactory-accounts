// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import {
  validate,
  IsEmail,
  Length,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate
} from 'class-validator'
import type { User } from './user.entity'

export class UserEntityValidator {
  @IsOptional()
  user_id: number | string

  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  user_name: string

  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  user_last_name: string

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  user_email: string

  @IsNotEmpty()
  @Length(8, 100)
  @IsString()
  user_password: string

  @IsNotEmpty()
  @IsDate()
  created_at: Date

  @IsNotEmpty()
  @IsDate()
  updated_at: Date

  @IsOptional()
  @IsDate()
  deleted_at: null | Date

  constructor(input: User) {
    Object.assign(this, input)
  }

  static async validate(input: User): Promise<void> {
    const dto = new UserEntityValidator(input)
    const errors = await validate(dto)

    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints).join(', '))
        .join('\n')

      throw new Error(errorMessages)
    }
  }
}
