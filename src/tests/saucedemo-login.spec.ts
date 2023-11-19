import { test } from '@playwright/test';
import LoginPage from '../page-objects/saucedemo-login-page';
import InventoryPage from '../page-objects/saucedemo-inventory-page';
import { UserCredentials } from '../data/login';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login tests', () => {
  test('Login page has correct title', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.expectTitleCorrect();
  });

  test('Standart user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const standartUser = UserCredentials.standartUser;
    await loginPage.login(standartUser.username, standartUser.password);
    await inventoryPage.expectInventoryPageOpened();
  });

  test('Locked user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const lockedUser = UserCredentials.lockedUser;
    await loginPage.login(lockedUser.username, lockedUser.password);
    await loginPage.expectErrorVisible();
    await loginPage.expectLockedUserMessageCorrect();
  });

  test('Problem user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const problemUser = UserCredentials.problemUser;
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(problemUser.username, problemUser.password);
    await inventoryPage.expectInventoryPageOpened();
  });

  test('Perfomance user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const performanceUser = UserCredentials.performanceUser;
    await loginPage.login(performanceUser.username, performanceUser.password);
    await inventoryPage.expectInventoryPageOpened();
  });

  test('Not existing user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const notExistingUser = UserCredentials.notExistingUser;
    await loginPage.login(notExistingUser.username, notExistingUser.password);
    await loginPage.expectErrorVisible();
    await loginPage.expectNotExistingUserMessageCorrect();
  });

  test('Login without username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.submitLogin();
    await loginPage.expectErrorVisible();
    await loginPage.expectRequiredUsernameMessageCorrect();
  });

  test('Login without password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const standartUser = UserCredentials.standartUser;
    await loginPage.fillUsername(standartUser.username);
    await loginPage.submitLogin();
    await loginPage.expectErrorVisible();
    await loginPage.expectRequiredPasswordMessageCorrect();
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
