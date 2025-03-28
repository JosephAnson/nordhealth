import { expect, test } from '@playwright/test'

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup')
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

  test('should display all form elements correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Confirm Password' })).toBeVisible()
    await expect(page.getByRole('checkbox', { name: 'I\'d like to receive occasional product updates' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' })

    await emailInput.fill('invalid-email')
    await emailInput.blur()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()

    await emailInput.fill('valid@example.com')
    await emailInput.blur()
    await expect(page.getByText('Please enter a valid email address')).not.toBeVisible()
  })

  test('should validate password requirements', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })

    await passwordInput.fill('short')
    await passwordInput.blur()
    await expect(page.getByText(/Password must be at least/)).toBeVisible()

    await passwordInput.fill('ValidPassword123!')
    await passwordInput.blur()
    await expect(page.getByText(/Password must be at least/)).not.toBeVisible()
  })

  test('should validate password confirmation', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })
    const confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })

    await emailInput.fill('test@example.com')
    await passwordInput.fill('ValidPassword123!')
    await confirmPasswordInput.fill('DifferentPassword123!')
    await confirmPasswordInput.blur()
    await expect(page.getByText('Passwords do not match')).toBeVisible()

    await confirmPasswordInput.fill('ValidPassword123!')
    await confirmPasswordInput.blur()
    await expect(page.getByText('Passwords do not match')).not.toBeVisible()
  })

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })
    const confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
    const toggleButtons = page.getByTitle('Toggle confirm password').getByRole('button')

    // Initially passwords should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password')
    await expect(confirmPasswordInput).toHaveAttribute('type', 'password')

    // Click toggle button
    await toggleButtons.click()

    // Passwords should be visible
    await expect(passwordInput).toHaveAttribute('type', 'text')
    await expect(confirmPasswordInput).toHaveAttribute('type', 'text')
  })

  test('should enable submit button when form is valid', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })
    const confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
    const submitButton = page.getByRole('button', { name: 'Sign up' })

    await expect(submitButton).toBeVisible()

    await emailInput.fill('test@example.com')
    await passwordInput.fill('ValidPassword123!')
    await confirmPasswordInput.fill('ValidPassword123!')

    await expect(submitButton).toBeVisible()
  })

  test('should handle successful signup', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: 'Email' })
    const passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })
    const confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
    const submitButton = page.getByRole('button', { name: 'Sign up' })

    await emailInput.fill('test@example.com')
    await passwordInput.fill('ValidPassword123!')
    await confirmPasswordInput.fill('ValidPassword123!')
    await submitButton.click()

    // Should redirect to success page
    await expect(page).toHaveURL('/success')
  })
})
