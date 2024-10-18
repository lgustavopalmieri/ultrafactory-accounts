// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { PASSWORD_MESSAGES } from './messages'
import { Password } from './password'
describe('Password', () => {
  test('should create and validate if provided input has minimum requirements', () => {
    const providedPasswords = ['Ultr4f4ct*ry', 'N1c3Pass##0rd']
    providedPasswords.forEach(pass => {
      expect(new Password(pass)).toBeTruthy()
    })
  })

  test('should throw an error with worng requirements provided', async () => {
    const wrongPasswords = [
      'justlowercase',
      '9878789',
      'JUSTUPPERCASE',
      '$#(*&@#',
      'min',
      'UpAndLow',
      'NoSp3cChar',
      'NoNum$$'
    ]

    wrongPasswords.forEach(pass => {
      expect(() => new Password(pass)).toThrowError(
        PASSWORD_MESSAGES.password_requirements
      )
    })
  })

  test('should verify the right passwords', async function () {
    const passwords = ['P4$$wOrd0ne', 'P4$$wOrdTwo', 'P4$$wOrdThr33']
    passwords.forEach(async pass => {
      const hashed = new Password(pass).getValue()
      expect(await Password.passwordsMatches(pass, hashed)).toBe(true)
    })
  })

  test('should throw an erro when wrong passwords', async function () {
    const passwords = ['P4$$wOrd0ne', 'P4$$wOrdTwo', 'P4$$wOrdThr33']
    const promises = passwords.map(async (pass, i) => {
      const hashed = new Password(pass).getValue()

      await expect(
        Password.passwordsMatches(pass, 'invalid-hash-format')
      ).rejects.toThrowError('Invalid hash format')

      await expect(
        Password.passwordsMatches(`${pass}+${i}`, hashed)
      ).rejects.toThrowError('Invalid password')
    })

    await Promise.all(promises)
  })
})
