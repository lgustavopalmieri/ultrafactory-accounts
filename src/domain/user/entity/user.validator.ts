// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import {
  IsEmail,
  Length,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate
} from 'class-validator'
import type { User } from './user.entity'
import { ValidatorErrors } from '../../@shared/validators/validator-errors.validator'

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
  @Length(8, 1000)
  @IsString()
  user_password: string

  @IsNotEmpty()
  @IsDate()
  user_created_at: Date

  @IsNotEmpty()
  @IsDate()
  user_updated_at: Date

  @IsOptional()
  @IsDate()
  user_deleted_at: null | Date

  constructor(input: User) {
    Object.assign(this, input)
  }

  static async validate(input: User): Promise<void> {
    const dto = new UserEntityValidator(input)
    await ValidatorErrors.validate(dto)
  }
}
