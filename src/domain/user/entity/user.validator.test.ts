// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserEntityValidator } from './user.validator'

describe('UserEntityValidator', function () {
  const validUser = {
    user_id: 1,
    user_name: 'John',
    user_last_name: 'Doe',
    user_email: 'john.doe@example.com',
    user_password: 'StrongPass123!',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null as any
  }
  test('should pass with valid input', async () => {
    await expect(UserEntityValidator.validate(validUser)).resolves.not.toThrow()
  })

  test('should throw an error for invalid deleted_at field', async () => {
    const invalidDeletedAtValues = [
      '',
      'not-a-date',
      123456,
      new Date('invalid-date'),
      [],
      {}
    ]

    for (const value of invalidDeletedAtValues) {
      await expect(
        UserEntityValidator.validate({ ...validUser, deleted_at: value as any })
      ).rejects.toThrowError(/deleted_at must be a Date instance/)
    }
  })

  test('should accept null or valid date for deleted_at field', async () => {
    const validValues = [null, new Date(), new Date('2023-01-01')]

    for (const value of validValues) {
      await expect(
        UserEntityValidator.validate({ ...validUser, deleted_at: value })
      ).resolves.not.toThrow()
    }
  })

  test('should throw an error for invalid created_at and updated_at fields', async () => {
    const invalidDates = [
      null,
      undefined,
      '',
      'not-a-date',
      123456,
      new Date('invalid-date'),
      [],
      {}
    ]

    for (const date of invalidDates) {
      await expect(
        UserEntityValidator.validate({
          ...validUser,
          created_at: date as any,
          updated_at: date as any
        })
      ).rejects.toThrowError(/created_at must be a Date instance/)

      await expect(
        UserEntityValidator.validate({
          ...validUser,
          created_at: date as any,
          updated_at: date as any
        })
      ).rejects.toThrowError(/updated_at must be a Date instance/)
    }
  })

  test('should validate correct created_at and updated_at fields', async () => {
    const validDates = [new Date(), new Date('2023-01-01')]

    for (const date of validDates) {
      await expect(
        UserEntityValidator.validate({
          ...validUser,
          created_at: date,
          updated_at: date
        })
      ).resolves.not.toThrow()
    }
  })

  test('should throw an error for missing or wrong user_password', async () => {
    await expect(
      UserEntityValidator.validate({ ...validUser, user_password: '' })
    ).rejects.toThrowError(
      'user_password must be longer than or equal to 8 characters, user_password should not be empty'
    )

    await expect(
      UserEntityValidator.validate({ ...validUser, user_password: 'pass' })
    ).rejects.toThrowError(
      'user_password must be longer than or equal to 8 characters'
    )

    await expect(
      UserEntityValidator.validate({ ...validUser, user_password: 232 as any })
    ).rejects.toThrowError(
      'user_password must be a string, user_password must be longer than or equal to 8 and shorter than or equal to 100 characters'
    )
  })

  test('should throw an error for missing or wrong user_email', async () => {
    await expect(
      UserEntityValidator.validate({ ...validUser, user_email: '' })
    ).rejects.toThrowError(
      'user_email must be an email, user_email should not be empty'
    )

    await expect(
      UserEntityValidator.validate({ ...validUser, user_email: 'email.com' })
    ).rejects.toThrowError('user_email must be an email')

    await expect(
      UserEntityValidator.validate({ ...validUser, user_email: 232 as any })
    ).rejects.toThrowError('user_email must be an email')
  })

  test('should throw an error for missing user_name and user_last_name', async () => {
    const props = ['user_name', 'user_last_name']

    for (const prop of props) {
      await expect(
        UserEntityValidator.validate({ ...validUser, [prop]: '' })
      ).rejects.toThrowError(
        `${prop} must be longer than or equal to 2 characters, ${prop} should not be empty`
      )

      await expect(
        UserEntityValidator.validate({ ...validUser, [prop]: 232 as any })
      ).rejects.toThrowError(
        `${prop} must be a string, ${prop} must be longer than or equal to 2 and shorter than or equal to 50 characters`
      )

      await expect(
        UserEntityValidator.validate({ ...validUser, [prop]: true as any })
      ).rejects.toThrowError(
        `${prop} must be a string, ${prop} must be longer than or equal to 2 and shorter than or equal to 50 characters`
      )

      await expect(
        UserEntityValidator.validate({
          ...validUser,
          [prop]: { key: 'value' } as any
        })
      ).rejects.toThrowError(
        `${prop} must be a string, ${prop} must be longer than or equal to 2 and shorter than or equal to 50 characters`
      )

      await expect(
        UserEntityValidator.validate({
          ...validUser,
          [prop]: [] as any
        })
      ).rejects.toThrowError(
        `${prop} must be a string, ${prop} must be longer than or equal to 2 characters`
      )
    }
  })
})
