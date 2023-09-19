import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('has errors for empty fields', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const error = page.locator('[data-test="error"]');
  await page.locator('[data-test="login-button"]').click();
  await expect(error).toHaveText('Epic sadface: Username is required');
  await error.getByRole('button').click();
  await expect(error).not.toBeVisible();
});

test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const usernameField = page.locator('[data-test="username"]');
  await usernameField.click();
  await usernameField.fill('standard_user');
  const passwordField = page.locator('[data-test="password"]');
  await passwordField.click();
  await passwordField.fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*\/inventory/);
});

test('add to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const usernameField = page.locator('[data-test="username"]');
  await usernameField.click();
  await usernameField.fill('standard_user');
  const passwordField = page.locator('[data-test="password"]');
  await passwordField.click();
  await passwordField.fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*\/inventory/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[class="shopping_cart_badge"]')).toContainText('1');
});

test('delete from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const usernameField = page.locator('[data-test="username"]');
  await usernameField.click();
  await usernameField.fill('standard_user');
  const passwordField = page.locator('[data-test="password"]');
  await passwordField.click();
  await passwordField.fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/.*\/inventory/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[class="shopping_cart_badge"]')).not.toBeVisible();
});