import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Success Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/success')
  })

  test('has no detectable a11y violations on load', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('#nuxt-devtools-container')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('visual regression', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('visual regression - dark mode', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('should display success message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /success/i })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continue to Dashboard' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue to Dashboard' }).click()
    await expect(page).toHaveURL('/')
  })
})
