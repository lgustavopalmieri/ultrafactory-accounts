// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { randomBytes, pbkdf2Sync } from 'crypto'

export class PasswordManager {
  /**
   * Validates if password has the requirements
   * Generates a secure hash for the provided password.
   * @param password The plain text password.
   * @returns A string containing the hash + salt for storage.
   */
  public static async validateAndHashPassword(
    password: string
  ): Promise<string> {
    await this.validateInputForNewPassword(password)
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return `${salt}:${hash}`
  }

  /**
   * Verifies if the provided password matches the stored hash.
   * @param password The plain text password.
   * @param storedHash The stored hash in the format "salt:hash".
   * @returns True if the password is correct, false otherwise.
   */
  public static async verifyPassword(
    password: string,
    storedHash: string
  ): Promise<boolean> {
    const [salt, originalHash] = storedHash.split(':')
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === originalHash
  }

  /**
   * Validates the provided password against defined criteria.
   * @param password The plain text password to validate.
   * @throws Error if the password does not meet the requirements.
   * @returns True if the password is valid, false otherwise.
   */
  private static async validateInputForNewPassword(
    password: string
  ): Promise<boolean> {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      throw new Error(
        'The password must have at least 8 characters, 1 number, 1 uppercase letter, and 1 special character.'
      )
    }

    return true
  }
}
