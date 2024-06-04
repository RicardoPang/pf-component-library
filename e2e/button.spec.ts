import { test } from '@playwright/test'

test.describe('PFButton Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/componentDocs/button.html')
  })

  test('should handle click events', async ({ page }) => {
    await page.click('button >> text=按钮')
  })
})
