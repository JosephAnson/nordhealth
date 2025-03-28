import isStrongPassword from 'validator/lib/isStrongPassword.js'
import * as z from 'zod'

export const userSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine(isStrongPassword, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
  receiveUpdates: z.boolean().optional(),
})

export type UserSchema = z.infer<typeof userSchema>

export const updateUserSchema = userSchema
  .extend({
    confirmPassword: z.string({ required_error: 'Confirm password is required' }).min(1, { message: 'Confirm password is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
