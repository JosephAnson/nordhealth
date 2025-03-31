import type { Page, PageAssertionsToHaveScreenshotOptions } from '@playwright/test'
import { expect } from '@playwright/test'

export const colorModes = ['light', 'dark', 'lightHighContrast', 'darkHighContrast']
export type ColorMode = typeof colorModes[number]

/**
 * Sets the color mode of the page
 * @param page - Playwright page object
 * @param mode - Color mode to set ('light', 'dark', 'lightHighContrast', or 'darkHighContrast')
 */
export async function setColorMode(page: Page, mode: ColorMode) {
  await page.evaluate(({ mode }) => {
    localStorage.setItem('nuxt-color-mode', mode)
  }, { mode })
  await page.reload()
}

/**
 * Runs a visual regression test for the current page
 * @param page - Playwright page object
 * @param options - Screenshot options
 */
export async function expectVisualSnapshotInColorMode(
  page: Page,
  mode: ColorMode,
  options: PageAssertionsToHaveScreenshotOptions = { fullPage: true },
) {
  await setColorMode(page, mode)
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveScreenshot(options)
}
