// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import type { Response } from 'express'

// CREATE A CLASS

export const successResponse = (
  res: Response,
  data: unknown,
  message = 'Success'
) =>
  res.status(200).json({
    status: 'success',
    message,
    data
  })

export const errorResponse = (res: Response, error: string, statusCode = 400) =>
  res.status(statusCode).json({
    status: 'error',
    message: 'Request failed',
    error
  })
