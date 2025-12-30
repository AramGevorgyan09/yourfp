export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const userId = Number(id)

  if (Number.isInteger(userId) && userId > 0) {
    const [userData] = await db.query('SELECT id, name, surname, email, role, age, country, educational_institution, preffered_major, target_universities, motivation, toefl, ielts, sat, gpa FROM users WHERE id = ?', userId)

    if (userData)
      return userData
  }

  throw createError({
    statusCode: 401,
    message: 'User not found!'
  })
})
