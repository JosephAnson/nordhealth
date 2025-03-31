import { expect, test } from '@playwright/test'
import { expectNoA11yViolations } from '../utils/a11y'
import { authenticateUser } from '../utils/auth'
import { colorModes, expectVisualSnapshotInColorMode } from '../utils/visual-regression'

test.describe('Success Page', () => {
  test.beforeEach(async ({ page, context }) => {
    // Set authentication cookie before accessing the page
    await authenticateUser(context, {
      email: 'test@example.com',
      authenticated: true,
    })

    await page.goto('/success')
  })

  test('has no detectable a11y violations on load', async ({ page }) => {
    await expectNoA11yViolations(page)
  })

  for (const mode of colorModes) {
    test(`visual regression for color modes: ${mode}`, async ({ page }) => {
      await expectVisualSnapshotInColorMode(page, mode)
    })
  }

  test('should display success message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /success/i })).toBeVisible()
    await expect(page.getByRole('main').getByRole('button', { name: 'Sign out' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('main').getByRole('button', { name: 'Sign out' }).click()
    await expect(page).toHaveURL('/')
  })

  test('should display the users email address', async ({ page }) => {
    await expect(page.getByRole('main').getByText('test@example.com')).toBeVisible()
  })
})
