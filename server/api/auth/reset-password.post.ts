import { z } from 'zod'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

const bodySchema = z.object({
  token: z.string(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20)
})

export default defineEventHandler(async (event) => {
  const { token, password, confirmPassword } = await readValidatedBody(event, bodySchema.parse)

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const [tokenData] = await db.query('SELECT user_id, expires FROM reset_tokens WHERE token = ?', tokenHash)

  if (tokenData && 'expires' in tokenData) {
    const expires = Number(tokenData.expires)

    if (Number.isInteger(expires) && expires < Date.now() && 'user_id' in tokenData && password === confirmPassword) {
      await db.query('DELETE FROM reset_tokens WHERE user_id = ?', tokenData.user_id)

      const hashedPassword = await bcrypt.hash(password, 10)

      await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, tokenData.user_id])

      // Send Email

      return {
        statusCode: 200,
        message: 'You have changed your password succesfully!'
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Error, please try again.'
  })
})
