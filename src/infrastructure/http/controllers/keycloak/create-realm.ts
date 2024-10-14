import type { Request, Response } from 'express'
import axios from 'axios'

const KEYCLOAK_URL = 'http://keycloak-ultrafactory:8080'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin'
const CLIENT_ID = 'admin-cli'

async function authenticate() {
  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        grant_type: 'password',
        client_id: CLIENT_ID
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )

    return response.data.access_token
  } catch (error) {
    console.error('Erro ao autenticar no Keycloak:', error)
    throw new Error('Erro ao autenticar no Keycloak')
  }
}

export async function createRealm(realmName: string) {
  const token = await authenticate()

  try {
    const response = await axios.post(
      `${KEYCLOAK_URL}/admin/realms`,
      { realm: realmName, enabled: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Erro ao criar realm:', error)
    throw new Error('Erro ao criar realm')
  }
}

export class KeycloakController {
  static async createRealm(req: Request, res: Response) {
    const { realmName } = req.body

    try {
      const newRealm = await createRealm(realmName)
      return res
        .status(201)
        .json({ message: 'Realm criado com sucesso!', newRealm })
    } catch (error: unknown) {
      console.error('Erro ao criar o realm:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao criar o realm', details: error })
    }
  }
}
