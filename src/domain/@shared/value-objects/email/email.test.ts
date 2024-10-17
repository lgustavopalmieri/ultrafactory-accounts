// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { Email } from './email'

describe('Email', () => {
  test('should throw an error for an invalid email', async () => {
    await expect(
      Email.create({ email: 'invalid-email' })
    ).rejects.toThrowError()
  })

  test('should create an email without errors', async () => {
    const email = await Email.create({ email: 'test@example.com' })
    expect(email.getEmail()).toBe('test@example.com')
  })
})
