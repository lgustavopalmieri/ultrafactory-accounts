import { validate } from 'class-validator'

export class ValidatorErrors {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async validate(input: any): Promise<void> {
    const errors = await validate(input)

    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints).join(', '))
        .join('\n')

      throw new Error(errorMessages)
    }
  }
}
