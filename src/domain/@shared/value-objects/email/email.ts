// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
export class Email {
  private readonly value: string

  constructor(email: string) {
    this.isValid(email)
    this.value = email
  }

  /**
   * Validates if the given email follows a proper format.
   *
   * The email must contain:
   * - A text before and after the `@` symbol
   * - A dot (`.`) followed by at least two letters (e.g., `.com`, `.org`)
   *
   * @param {string} email - The email to validate.
   * @throws {Error} If the email is invalid, throws an "Invalid email" error.
   *
   * @example
   * isValid("user@example.com"); // No error
   * isValid("invalid-email.com"); // Throws Error: "Invalid email"
   */
  private isValid(email: string): void {
    const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/i
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email')
    }
  }

  public getValue(): string {
    return this.value
  }
}
