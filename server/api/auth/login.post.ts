import { z } from 'zod'
import bcrypt from 'bcrypt'

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const [passwordByEmail] = await db.query('SELECT password FROM users WHERE email = ?', email)

  if (passwordByEmail && Array.isArray(passwordByEmail) && 'password' in passwordByEmail[0]) {
    const comparison = await bcrypt.compare(password, passwordByEmail[0].password)

    if (comparison) {
      const [userData] = await db.query('SELECT name, surname, email, role, age, country, educational_institution, preffered_major, target_universities, motivation, toefl, ielts, sat, gpa FROM users WHERE email = ?', email)

      if (userData) {
        await setUserSession(event, {
          user: {
            email: email
          }
        })

        return {
          statusCode: 200,
          message: 'You have logged in succesfully!'
        }
      }
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Error, please try again.'
  })
})
