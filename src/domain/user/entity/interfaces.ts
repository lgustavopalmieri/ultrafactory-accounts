// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
export interface UserEntityInterface {
  user_id?: number | string
  user_name: string
  user_last_name: string
  user_email: string
  user_password: string
  user_created_at: Date
  user_updated_at: Date
  user_deleted_at: null | Date
}

export interface UserEntityCreateInput {
  user_name: string
  user_last_name: string
  user_email: string
  user_password: string
}
