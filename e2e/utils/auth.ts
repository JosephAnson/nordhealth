import type { BrowserContext } from '@playwright/test'

interface AuthUser {
  email?: string
  authenticated?: boolean
}

export async function authenticateUser(
  context: BrowserContext,
  user: AuthUser = { email: 'test@example.com', authenticated: true },
) {
  await context.addCookies([
    {
      name: 'auth',
      value: JSON.stringify(user),
      domain: 'localhost',
      path: '/',
    },
  ])
}
