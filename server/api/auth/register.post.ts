import type { UserSchema } from '~~/schemas/user'
import { defineEventHandler, readValidatedBody } from 'h3'
import { updateUserSchema } from '~~/schemas/user'

interface StoredUser extends UserSchema {
  createdAt: string
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, updateUserSchema.parse)

  const user: StoredUser = {
    email: body.email,
    password: body.password,
    receiveUpdates: body.receiveUpdates,
    createdAt: new Date().toISOString(),
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    email: user.email,
    receiveUpdates: user.receiveUpdates,
    createdAt: user.createdAt,
  }
})
