export default defineEventHandler(async (event) => {
  const userSession = await getUserSession(event)

  if (userSession.user && 'email' in userSession.user) {
    const [userData] = await db.query('SELECT id, name, surname, email, role, age, country, educational_institution, preffered_major, target_universities, motivation, toefl, ielts, sat, gpa FROM users WHERE email = ?', userSession.user.email)
    
    if (userData)
      return userData
  }

  throw createError({
    statusCode: 401,
    message: 'Cannot get profile data, please try again.'
  })
})
