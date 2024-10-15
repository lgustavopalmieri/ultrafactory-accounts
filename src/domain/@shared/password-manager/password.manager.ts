// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import { randomBytes, pbkdf2Sync } from 'crypto'
import { PASSWORD_MESSAGES } from './messages'

export class PasswordManager {
  /**
   * Validates and generates password
   * @param password The plain text password.
   * @returns A validated string containing the hashed password.
   */
  public static async validateAndHashPassword(
    password: string
  ): Promise<string> {
    await this.validateInputForNewPassword(password)
    return this.hashPassword(password)
  }

  /**
   * Generates a secure hash for the provided password.
   * @param password The plain text password.
   * @returns A string containing the hash + salt for storage.
   */
  public static async hashPassword(password: string): Promise<string> {
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
    if (!salt || !originalHash) {
      throw new Error(PASSWORD_MESSAGES.invalid_hash)
    }
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    if (hash !== originalHash) {
      throw new Error(PASSWORD_MESSAGES.invalid_password)
    }
    return true
  }

  /**
   * Validates the provided password against defined criteria.
   * @param password The plain text password to validate.
   * @throws Error if the password does not meet the requirements.
   * @returns True if the password is valid, false otherwise.
   */
  public static async validateInputForNewPassword(
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
      throw new Error(PASSWORD_MESSAGES.password_requirements)
    }

    return true
  }
}
