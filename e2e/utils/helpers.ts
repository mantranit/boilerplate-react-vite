import { Page, expect } from '@playwright/test';

// ----------------------------------------------------------------------

/**
 * Fills in and submits the sign-in form.
 */
export async function signIn(page: Page, email: string, password: string) {
  await page.goto('/auth/sign-in');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();
}

/**
 * Waits for the page to fully load by checking for the absence of a loading
 * indicator or the presence of a known stable element.
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

/**
 * Asserts that the current URL matches the given path.
 */
export async function expectPath(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(path.replace(/\//g, '\\/')));
}
