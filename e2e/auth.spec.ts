import { test, expect } from '@playwright/test';

// ----------------------------------------------------------------------

test.describe('Sign-in page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/sign-in');
  });

  test('renders sign-in form elements', async ({ page }) => {
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText('Email address is required.')).toBeVisible();
    await expect(page.getByText('Password is required.')).toBeVisible();
  });

  test('shows validation error for invalid email format', async ({ page }) => {
    await page.getByLabel('Email address').fill('not-an-email');
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page.getByText('Please enter an valid email address.')).toBeVisible();
  });

  test('forgot password link navigates to the correct page', async ({ page }) => {
    await page.getByRole('link', { name: /forgot password/i }).click();

    await expect(page).toHaveURL(/\/auth\/forgot-password/);
  });
});
