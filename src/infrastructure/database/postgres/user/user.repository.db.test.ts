// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { User } from '../../../../domain/user/entity/user.entity'
import { testDatabase } from '../postgres.client'
import { UserRepository } from './user.repository.db'
import fs from 'fs/promises'
import path from 'path'

// CREATE A CLASS

async function runMigration(migrationFile: string): Promise<void> {
  try {
    const filePath = path.join(__dirname, '../migrations/sqls', migrationFile)
    const sql = await fs.readFile(filePath, 'utf-8')
    await testDatabase.none(sql)
    console.log(`Executed migration: ${migrationFile}`)
  } catch (error) {
    console.error(`Failed to execute migration: ${migrationFile}`, error)
    throw error
  }
}

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeEach(async () => {
    userRepository = new UserRepository(testDatabase)
    await runMigration('20241010234614-create-users-table-up.sql')
  })

  afterEach(async () => {
    await runMigration('20241010234614-create-users-table-down.sql')
  })

  afterAll(async () => {
    await testDatabase.$pool.end()
  })

  it('should create a user', async () => {
    const user = await User.create({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'taest@example.com',
      user_password: 'StrongPass123!'
    })

    const createdUser = await userRepository.create(user)
    expect(createdUser).toHaveProperty('user_id')
    expect(createdUser.user_email).toBe('taest@example.com')
  })

  it('should find a user by email', async () => {
    const user = await User.create({
      user_name: 'Test',
      user_last_name: 'User',
      user_email: 'taest@example.com',
      user_password: 'StrongPass123!'
    })

    await userRepository.create(user)
    const foundUser = await userRepository.findByEmail('taest@example.com')

    expect(foundUser).toBeTruthy()
    expect(foundUser.user_email).toBe('taest@example.com')
  })
})
