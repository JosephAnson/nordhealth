import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const authCookie = getCookie(event, 'auth')

  if (!authCookie) {
    return { authenticated: false }
  }

  return JSON.parse(authCookie)
})
