import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Error Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a non-existent page to trigger the error page
    await page.goto('/error')
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

  test('should display error message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Something\'s wrong' })).toBeVisible()
    await expect(page.getByText(/Looks like something went wrong/i)).toBeVisible()
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Retry' }).click()
    await expect(page).toHaveURL('/')
  })
})
