import { expect, test } from '@playwright/test'
import { expectNoA11yViolations } from '../utils/a11y'
import { colorModes, expectVisualSnapshotInColorMode } from '../utils/visual-regression'

test.describe('Error Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/error')
  })

  test('has no detectable a11y violations on load', async ({ page }) => {
    await expectNoA11yViolations(page)
  })

  test('visual regression', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('should display error message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Something\'s wrong' })).toBeVisible()
    await expect(page.getByText(/Looks like something went wrong/i)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Retry' }).click()
    await expect(page).toHaveURL('/signup')
  })
})
