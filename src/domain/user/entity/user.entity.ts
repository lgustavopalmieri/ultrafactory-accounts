import { v4 as uuid } from 'uuid'

interface UserEntityInterface {
  user_id?: number | string
  name: string
  last_name: string
  email: string
  password: string
}

export class User {
  readonly user_id: number | string
  readonly name: string
  readonly last_name: string
  readonly email: string
  readonly password: string
  constructor({
    user_id,
    name,
    last_name,
    email,
    password
  }: UserEntityInterface) {
    this.user_id = user_id ?? uuid()
    this.name = name
    this.last_name = last_name
    this.email = email
    this.password = password
  }
}
