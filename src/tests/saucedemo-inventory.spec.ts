import { test } from '@playwright/test';
import { UserCredentials } from '../data/login';
import LoginPage from '../page-objects/saucedemo-login-page';
import InventoryPage from '../page-objects/saucedemo-inventory-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const standartUser = UserCredentials.standartUser;
  await page.goto('/');
  await loginPage.login(standartUser.username, standartUser.password);
  await inventoryPage.expectInventoryPageOpened();
});

test.describe('Invetory tests', () => {
  test('Add and remove all products from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart(inventoryPage.BACKPACK);
    await inventoryPage.addProductToCart(inventoryPage.BOLT_SHIRT);
    await inventoryPage.addProductToCart(inventoryPage.ONESIE);
    await inventoryPage.addProductToCart(inventoryPage.BIKE_LIGHT);
    await inventoryPage.addProductToCart(inventoryPage.FLEECE_JACKET);
    await inventoryPage.addProductToCart(inventoryPage.TEST_ALL);
    await inventoryPage.expectProductNumberIsCorrect('full');

    await inventoryPage.removeProductFromCart(
      inventoryPage.BACKPACK,
      'invPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.BOLT_SHIRT,
      'invPage'
    );
    await inventoryPage.removeProductFromCart(inventoryPage.ONESIE, 'invPage');
    await inventoryPage.removeProductFromCart(
      inventoryPage.BIKE_LIGHT,
      'invPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.FLEECE_JACKET,
      'invPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.TEST_ALL,
      'invPage'
    );
    await inventoryPage.expectProductNumberIsCorrect('empty');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
