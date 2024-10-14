// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import {
  validate,
  IsEmail,
  Length,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional
} from 'class-validator'
import type { UserEntityCreateInput } from './interfaces'

export class CreateUserEntityValidator {
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
  @IsDateString()
  created_at: Date

  @IsNotEmpty()
  @IsDateString()
  updated_at: Date

  @IsOptional()
  @IsDateString()
  deleted_at: null | Date

  constructor(input: UserEntityCreateInput) {
    Object.assign(this, input)
  }

  static async validate(input: UserEntityCreateInput): Promise<void> {
    const dto = new CreateUserEntityValidator(input)
    const errors = await validate(dto)

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`)
    }
  }
}
