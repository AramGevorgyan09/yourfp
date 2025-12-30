export default defineEventHandler(async () => {
  const [users] = await db.query('SELECT id, name, surname, role, age, country, educational_institution FROM users')

  if (users)
    return users

  throw createError({
    statusCode: 401,
    message: 'Cannot get users data, please try again.'
  })
})
