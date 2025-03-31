import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  // Clear the auth cookie
  deleteCookie(event, 'auth', {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'strict',
    path: '/',
  })

  return { success: true }
})
