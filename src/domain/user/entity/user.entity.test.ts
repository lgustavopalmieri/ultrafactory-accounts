// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { PASSWORD_MESSAGES } from '../../@shared/value-objects/password/messages'
import { Password } from '../../@shared/value-objects/password/password'
import { User } from './user.entity'

describe('User Entity', function () {
  test('should create an user with all properties and values', async function () {
    const newUser = await User.create({
      user_name: 'input.user_name',
      user_last_name: 'input.user_last_name',
      user_email: 'input.user_email@mail.com',
      user_password: 'StrongPass123!'
    })
    expect(newUser).toHaveProperty('user_id')
    expect(newUser).toHaveProperty('user_name')
    expect(newUser).toHaveProperty('user_last_name')
    expect(newUser).toHaveProperty('user_email')
    expect(newUser).toHaveProperty('user_password')
    expect(newUser).toHaveProperty('user_created_at')
    expect(newUser).toHaveProperty('user_updated_at')
    expect(newUser).toHaveProperty('user_deleted_at')

    expect(newUser.user_name).toBe('input.user_name')
    expect(newUser.user_last_name).toBe('input.user_last_name')
    expect(newUser.user_email).toBe('input.user_email@mail.com')
    expect(
      Password.passwordsMatches('StrongPass123!', newUser.user_password)
    ).toBeTruthy()
    expect(newUser.user_password).not.toBe('StrongPass123!')
    expect(newUser.user_created_at).toBeInstanceOf(Date)
    expect(newUser.user_updated_at).toBeInstanceOf(Date)
    expect(newUser.user_deleted_at).toBeNull()
  })

  test('should throw an error if requirements doesnt match', async () => {
    await expect(
      User.create({
        user_name: 'input.user_name',
        user_last_name: 'input.user_last_name',
        user_email: 'invalid-email',
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrowError('Invalid email')

    await expect(
      User.create({
        user_name: 'input.user_name',
        user_last_name: 'input.user_last_name',
        user_email: 'valid@email',
        user_password: 'weak-password'
      })
    ).rejects.toThrowError(
      'The password must have at least 8 characters, 1 number, 1 uppercase letter, and 1 special character.'
    )
  })

  test('should load an user', async () => {
    const newUser = User.create({
      user_name: 'input.user_name',
      user_last_name: 'input.user_last_name',
      user_email: 'input.user_email@mail.com',
      user_password: 'StrongPass123!'
    })

    expect(await newUser).toBeDefined()

    const loadUser = User.load(await newUser)

    expect(loadUser.user_name).toBe('input.user_name')
    expect(loadUser.user_last_name).toBe('input.user_last_name')
    expect(loadUser.user_email).toBe('input.user_email@mail.com')

    expect(
      Password.passwordsMatches('StrongPass123!', loadUser.user_password)
    ).toBeTruthy()
    expect((await newUser).user_password).not.toBe('StrongPass123!')
    expect(loadUser.user_created_at).toBeInstanceOf(Date)
    expect(loadUser.user_updated_at).toBeInstanceOf(Date)
    expect(loadUser.user_deleted_at).toBeNull()
  })

  test('should update an user', async () => {
    const newUser = User.create({
      user_name: 'input.user_name',
      user_last_name: 'input.user_last_name',
      user_email: 'input.user_email@mail.com',
      user_password: 'StrongPass123!'
    })

    const loadUser = User.load(await newUser)

    const updatedUser = await User.update({
      user: loadUser,
      input: {
        user_name: 'updated user name',
        user_last_name: 'updated.user_last_name',
        user_email: 'updated.user_email@mail.com',
        user_password: 'N3WStrongPass123!'
      }
    })

    expect(updatedUser.user_name).toBe('updated user name')
    expect(updatedUser.user_last_name).toBe('updated.user_last_name')
    expect(updatedUser.user_email).toBe('updated.user_email@mail.com')
    expect(
      Password.passwordsMatches('StrongPass123!', updatedUser.user_password)
    ).rejects.toThrowError(new Error(PASSWORD_MESSAGES.invalid_password))
    expect(
      Password.passwordsMatches('N3WStrongPass123!', updatedUser.user_password)
    ).toBeTruthy()
  })

  test('should throw an error when update email or password doesnt fit requirements', async () => {
    const newUser = User.create({
      user_name: 'input.user_name',
      user_last_name: 'input.user_last_name',
      user_email: 'input.user_email@mail.com',
      user_password: 'StrongPass123!'
    })

    const loadUser = User.load(await newUser)

    await expect(
      User.update({
        user: loadUser,
        input: {
          user_name: 'updated user name',
          user_last_name: 'updated.user_last_name',
          user_email: 'updated.user_email',
          user_password: 'N3WStrongPass123!'
        }
      })
    ).rejects.toThrowError('Invalid email')

    await expect(
      User.update({
        user: loadUser,
        input: {
          user_name: 'updated user name',
          user_last_name: 'updated.user_last_name',
          user_email: 'input.user_email@mail.com',
          user_password: 'weakpass'
        }
      })
    ).rejects.toThrowError(
      'The password must have at least 8 characters, 1 number, 1 uppercase letter, and 1 special character.'
    )
  })
})
