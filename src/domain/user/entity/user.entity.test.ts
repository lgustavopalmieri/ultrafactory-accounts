// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { User } from './user.entity'

describe('User Entity', function () {
  test('should have all properties', async function () {
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
  })
})
