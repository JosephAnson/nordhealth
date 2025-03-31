import { expect, test } from '@playwright/test'
import { expectNoA11yViolations } from '../utils/a11y'

test.describe('404 Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/non-existent-page')
  })

  test('has no detectable a11y violations on load', async ({ page }) => {
    await expectNoA11yViolations(page)
  })

  test('visual regression', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('should display 404 message and navigation', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.getByText('The page you are looking for could not be found.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Back to Home' })).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.getByRole('link', { name: 'Back to Home' }).click()
    await expect(page).toHaveURL('/signup')
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
