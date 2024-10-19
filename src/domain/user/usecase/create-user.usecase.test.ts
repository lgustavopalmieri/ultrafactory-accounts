// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { Password } from '../../@shared/value-objects/password/password'
import { InMemoryUserRepository } from '../repository/in-memory.repository'
import { CreateUserUseCase } from './create-user.usecase'
describe('CreateUser UseCase', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: InMemoryUserRepository

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
  })
  afterEach(() => {
    userRepository.clear()
  })

  it('should create a user successfully', async () => {
    const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail')
    const userPassword = 'StrongPass123!'
    const newUser = await createUserUseCase.execute({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'test@example.com',
      user_password: userPassword
    })

    expect(newUser.user_id).toBeDefined()
    expect(newUser).toMatchObject({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'test@example.com'
    })
    expect(newUser.user_password).not.toBe(userPassword)
    expect(
      Password.passwordsMatches(userPassword, newUser.user_password)
    ).toBeTruthy()

    expect(newUser.user_created_at).toBeInstanceOf(Date)
    expect(newUser.user_updated_at).toBeInstanceOf(Date)
    expect(newUser.user_deleted_at).toBeNull()

    expect(findByEmailSpy).toHaveBeenCalledWith('test@example.com')
    expect(findByEmailSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw an error if user already exists', async () => {
    const findByEmailSpy = jest.spyOn(userRepository, 'findByEmail')
    await createUserUseCase.execute({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'test@example.com',
      user_password: 'StrongPass123!'
    })

    await expect(
      createUserUseCase.execute({
        user_name: 'Another Test',
        user_last_name: 'Another User',
        user_email: 'test@example.com',
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrow('User already exists')
    expect(findByEmailSpy).toHaveBeenCalledWith('test@example.com')
    expect(findByEmailSpy).toHaveBeenCalledTimes(2)
  })

  it('should throw an error if password and email doesnt fit requirements', async () => {
    const userPassword = 'weak-password'
    const wrongEmail = 'noanemail.com'
    await expect(
      createUserUseCase.execute({
        user_name: 'Test',
        user_last_name: 'User',
        user_email: 'test@example.com',
        user_password: userPassword
      })
    ).rejects.toThrowError(
      'The password must have at least 8 characters, 1 number, 1 uppercase letter, and 1 special character.'
    )

    await expect(
      createUserUseCase.execute({
        user_name: 'Test',
        user_last_name: 'User',
        user_email: wrongEmail,
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrowError('Invalid email')
  })

  it('should throw an error if user_name is empty', async () => {
    await expect(
      createUserUseCase.execute({
        user_name: '',
        user_last_name: 'User',
        user_email: 'test@example.com',
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrowError(
      'user_name must be longer than or equal to 2 characters, user_name should not be empty'
    )
  })
  it('should throw an error if user_last_name is empty', async () => {
    await expect(
      createUserUseCase.execute({
        user_name: 'Test',
        user_last_name: '',
        user_email: 'test@example.com',
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrowError(
      'user_last_name must be longer than or equal to 2 characters, user_last_name should not be empty'
    )
  })

  it('should handle unexpected errors in findByEmail', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockImplementationOnce(() => {
      throw new Error('Database error')
    })

    await expect(
      createUserUseCase.execute({
        user_name: 'Test',
        user_last_name: 'User',
        user_email: 'test@example.com',
        user_password: 'StrongPass123!'
      })
    ).rejects.toThrowError('Database error')
  })
})
