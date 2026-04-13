import { test as base, expect, Page } from '@playwright/test';

// ----------------------------------------------------------------------

type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Extended test fixture that provides a pre-authenticated page.
 * Sets a mock access token in sessionStorage to bypass the auth guard.
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to the app first to establish the origin
    await page.goto('/');

    // Inject a mock token into sessionStorage so the AuthProvider treats
    // the session as authenticated. Replace the value below with a real
    // long-lived token when testing against an actual API.
    await page.evaluate(() => {
      sessionStorage.setItem('access_token', 'mock-access-token');
    });

    await use(page);

    // Clean up after the test
    await page.evaluate(() => sessionStorage.clear());
  },
});

export { expect };
