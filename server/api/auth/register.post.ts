import { z } from 'zod'
import bcrypt from 'bcrypt'

const bodySchema = z.object({
  name: z.string().trim().min(2).max(50),
  surname: z.string().trim().min(2).max(50),
  email: z.email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20)
})

export default defineEventHandler(async (event) => {
  const { name, surname, email, password, confirmPassword } = await readValidatedBody(event, bodySchema.parse)

  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
      'INSERT INTO users (name, surname, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, surname, email, hashedPassword, 'Seeker']
    )

    await setUserSession(event, {
      user: {
        email: email
      }
    })

    return {
      statusCode: 200,
      message: 'You have registered succesfully!'
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Error, please try again.'
  })
})
