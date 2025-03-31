import type { UserSchema } from '~~/schemas/user'
import { defineEventHandler, readValidatedBody } from 'h3'
import { userSchema } from '~~/schemas/user'

interface StoredUser extends UserSchema {
  id: string
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, userSchema.parse)

  const user: StoredUser = {
    id: Math.random().toString(36).substring(2),
    email: body.email,
    password: body.password,
    receiveUpdates: body.receiveUpdates,
    createdAt: new Date().toISOString(),
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Set simple auth cookie
  setCookie(event, 'auth', JSON.stringify({
    email: user.email,
    authenticated: true,
  }), {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })

  // Return sanitized user object (no password)
  return {
    id: user.id,
    email: user.email,
    receiveUpdates: user.receiveUpdates,
    createdAt: user.createdAt,
  }
})
