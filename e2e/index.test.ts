import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to signup page', async ({ page }) => {
    await expect(page).toHaveURL('/signup')
  })
})
