import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('404 Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/non-existent-page')
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

  test('should display 404 message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.getByText('The page you are looking for could not be found.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Back to Home' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Back to Home' }).click()
    await expect(page).toHaveURL('/')
  })

  test('should handle various non-existent routes', async ({ page }) => {
    const nonExistentRoutes = [
      '/random-page',
      '/api/not-found',
      '/products/123',
      '/category/unknown',
    ]

    for (const route of nonExistentRoutes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
      await expect(page.getByText('The page you are looking for could not be found.')).toBeVisible()
    }
  })
})
