import { z } from 'zod'
import crypto from 'node:crypto'

const bodySchema = z.object({
  email: z.email()
})

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)

  const [userId] = await db.query('SELECT id FROM users WHERE email = ?', email)

  if (userId) {
    const [resetToken] = await db.query('SELECT token FROM reset_tokens WHERE id = ?', userId)

    if (!resetToken) {
      const token = crypto.randomBytes(32).toString('hex')
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
      const expires = Date.now() + 10 * 60 * 1000

      await db.query('INSERT INTO reset_tokens (user_id, token, expires) VALUES (?, ?, ?)', [userId, tokenHash, expires])

      // Send Email
      const resetLink = `https://site.com/reset-password?token=${token}`

      return {
        statusCode: 200,
        message: 'You have logged in succesfully!'
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Error, please try again.'
  })
})
