// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { User } from '../../../../domain/user/entity/user.entity'
import { testDatabase } from '../postgres.client'
import { UserRepository } from './user.repository.db'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeAll(async () => {
    userRepository = new UserRepository(testDatabase)
  })

  afterAll(async () => {
    await testDatabase.$pool.end()
  })

  beforeEach(async () => {
    await testDatabase.none('DELETE FROM users')
  })

  it('should create a user', async () => {
    const user = await User.create({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'test@example.com',
      user_password: 'StrongPass123!'
    })

    const createdUser = await userRepository.create(user)
    expect(createdUser).toHaveProperty('user_id')
    expect(createdUser.user_email).toBe('test@example.com')
  })

  it('should find a user by email', async () => {
    const user = await User.create({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'test@example.com',
      user_password: 'StrongPass123!'
    })

    await userRepository.create(user)
    const foundUser = await userRepository.findByEmail('test@example.com')

    expect(foundUser).toBeTruthy()
    expect(foundUser.user_email).toBe('test@example.com')
  })
})
