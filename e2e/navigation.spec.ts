import { test, expect } from '@playwright/test';

// ----------------------------------------------------------------------

test.describe('Navigation', () => {
  test('root path redirects to dashboard or sign-in', async ({ page }) => {
    await page.goto('/');

    // The app either shows the dashboard (if authenticated) or redirects to sign-in
    const url = page.url();
    expect(url).toMatch(/\/(auth\/sign-in|$)/);
  });

  test('unknown route redirects to /404', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.waitForURL(/\/404/, { timeout: 10000 });

    await expect(page).toHaveURL(/\/404/);
    await expect(page.getByText('Sorry, page not found!')).toBeVisible();
  });

  test('page title is set', async ({ page }) => {
    await page.goto('/auth/sign-in');
    await expect(page).toHaveTitle(/.+/);
  });
});
