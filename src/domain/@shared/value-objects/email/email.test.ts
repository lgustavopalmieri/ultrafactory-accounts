// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { Email } from './email'

describe('Email', () => {
  test('should throw an error for an invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow('Invalid email')
    expect(() => new Email('@example.com')).toThrow('Invalid email')
    expect(() => new Email('a@')).toThrow('Invalid email')
  })

  test('should create an email without errors', () => {
    const email = new Email('test@example.com')
    expect(email.getValue()).toBe('test@example.com')
  })
})
