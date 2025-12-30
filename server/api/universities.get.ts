export default defineEventHandler(async () => {
  const [universities] = await db.query('SELECT * FROM universities')
  const [faculties] = await db.query('SELECT * FROM faculties')
  const [requirements] = await db.query('SELECT * FROM requirements')

  if (universities && faculties && requirements)
    return [universities, faculties, requirements]

  throw createError({
    statusCode: 401,
    message: 'Cannot get universities data, please try again.'
  })
})
