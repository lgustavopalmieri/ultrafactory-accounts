// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________

import { PasswordManager } from './password.manager'

describe('validateInputForNewPassword Password manager test', function () {
  test('should validate if provided input has minimum requirements', async function () {
    const providedPasswords = ['Ultr4f4ct*ry', 'N1c3Pass##0rd']
    providedPasswords.forEach(async function (pass) {
      expect(PasswordManager.validateInputForNewPassword(pass)).toBeTruthy()
    })
  })

  test('should throw an error with worng requirements provided', async function () {
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

    wrongPasswords.forEach(async pass => {
      await expect(
        PasswordManager.validateInputForNewPassword(pass)
      ).rejects.toThrowError(
        'The password must have at least 8 characters, 1 number, 1 uppercase letter, and 1 special character.'
      )
    })
  })

  describe('hashPassword Password manager test', function () {
    test('should hash an provided password', async function () {
      const password = 'buba'
      const hashedPassword = await PasswordManager.hashPassword(password)
      expect(hashedPassword).not.toBe(password)
    })
  })

  describe('should verify if passwords matches', function () {
    test('should verify the right passwords', async function () {
      const passwords = ['P4$$wOrd0ne', 'P4$$wOrdTwo', 'P4$$wOrdThr33']
      passwords.forEach(async pass => {
        const hashed = await PasswordManager.hashPassword(pass)
        expect(await PasswordManager.verifyPassword(pass, hashed)).toBe(true)
      })
    })
    test('should throw an erro when wrong passwords', async function () {
      const passwords = ['P4$$wOrd0ne', 'P4$$wOrdTwo', 'P4$$wOrdThr33']
      const promises = passwords.map(async (pass, i) => {
        const hashed = await PasswordManager.hashPassword(pass)

        await expect(
          PasswordManager.verifyPassword(pass, 'invalid-hash-format')
        ).rejects.toThrowError('Invalid hash format')

        await expect(
          PasswordManager.verifyPassword(`${pass}+${i}`, hashed)
        ).rejects.toThrowError('Invalid password')
      })

      await Promise.all(promises)
    })
  })
})
