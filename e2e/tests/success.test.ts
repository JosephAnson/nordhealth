import { expect, test } from '@playwright/test'
import { expectNoA11yViolations } from '../utils/a11y'
import { colorModes, expectVisualSnapshotInColorMode } from '../utils/visual-regression'

test.describe('Success Page', () => {
  test.beforeEach(async ({ page }) => {
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
    await expect(page.getByRole('button', { name: 'Continue to Dashboard' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue to Dashboard' }).click()
    await expect(page).toHaveURL('/signup')
  })
})
