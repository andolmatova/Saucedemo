import { test } from '@playwright/test';
import { UserCredentials } from '../data/login';
import { Items } from '../data/item-interface';
import LoginPage from '../page-objects/saucedemo-login-page';
import InventoryPage from '../page-objects/saucedemo-inventory-page';
import CartPage from '../page-objects/saycedemo-cart-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const standard_user = UserCredentials.standartUser;
  await page.goto('/');
  await loginPage.login(standard_user.username, standard_user.password);
  await inventoryPage.expectInventoryPageOpened();
});

test.describe('Cart tests', () => {
  test('Add product to cart and check list, remove items from cart page', async ({
    page
  }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const backpack = Items.backpack;
    const bikeLight = Items.bikeLight;
    const boltShirt = Items.boltShirt;
    const fleeceJacket = Items.fleeceJacket;
    const onesie = Items.onesie;
    const test = Items.testAllThings;

    await inventoryPage.addProductToCart(inventoryPage.BACKPACK);
    await inventoryPage.addProductToCart(inventoryPage.BOLT_SHIRT);
    await inventoryPage.addProductToCart(inventoryPage.ONESIE);
    await inventoryPage.addProductToCart(inventoryPage.BIKE_LIGHT);
    await inventoryPage.addProductToCart(inventoryPage.FLEECE_JACKET);
    await inventoryPage.addProductToCart(inventoryPage.TEST_ALL);
    await inventoryPage.expectProductNumberIsCorrect('full');
    await inventoryPage.moveToCart();
    await cartPage.expectItemDisplayedInList(backpack.name);
    await cartPage.expectItemDisplayedInList(bikeLight.name);
    await cartPage.expectItemDisplayedInList(boltShirt.name);
    await cartPage.expectItemDisplayedInList(fleeceJacket.name);
    await cartPage.expectItemDisplayedInList(onesie.name);
    await cartPage.expectItemDisplayedInList(test.name);
    await inventoryPage.removeProductFromCart(
      inventoryPage.BACKPACK,
      'cartPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.BOLT_SHIRT,
      'cartPage'
    );
    await inventoryPage.removeProductFromCart(inventoryPage.ONESIE, 'cartPage');
    await inventoryPage.removeProductFromCart(
      inventoryPage.BIKE_LIGHT,
      'cartPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.FLEECE_JACKET,
      'cartPage'
    );
    await inventoryPage.removeProductFromCart(
      inventoryPage.TEST_ALL,
      'cartPage'
    );
    await inventoryPage.expectProductNumberIsCorrect('empty');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
