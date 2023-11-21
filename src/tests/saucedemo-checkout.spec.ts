import { test, expect } from '@playwright/test';
import { UserCredentials } from '../data/login';
import { Items } from '../data/item-interface';
import LoginPage from '../page-objects/saucedemo-login-page';
import InventoryPage from '../page-objects/saucedemo-inventory-page';
import CartPage from '../page-objects/saycedemo-cart-page';
import CheckoutStepOnePage from '../page-objects/saucedemo-checkout-step-one-page';
import CheckoutStepTwoPage from '../page-objects/saucedemo-checkout-step-two-page';
import CompletePage from '../page-objects/saucedemo-complete-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const stdUser = UserCredentials.standartUser;
  await page.goto('/');
  await loginPage.login(stdUser.username, stdUser.password);
  await inventoryPage.expectInventoryPageOpened();
});

test.describe('Checkout tests', () => {
  test('Add product to cart and procede to thank page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const completePage = new CompletePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const cartPage = new CartPage(page);
    const backpack = Items.backpack;
    const bikeLight = Items.bikeLight;

    await inventoryPage.addProductToCart(inventoryPage.BACKPACK);
    await inventoryPage.addProductToCart(inventoryPage.BIKE_LIGHT);
    await expect(page.locator(inventoryPage.SHOPPING_CART_LINK)).toHaveText(
      '2'
    );
    await inventoryPage.moveToCart();
    await inventoryPage.expectItemDisplayedInList(backpack.name);
    await inventoryPage.expectItemDisplayedInList(bikeLight.name);
    await cartPage.moveToCheckoutStepOnePage();
    await checkoutStepOnePage.fillInformation('Anastasia', 'Ivanova', '653038');
    await checkoutStepOnePage.moveToCheckoutStepTwoPage();
    await inventoryPage.expectItemDisplayedInList(backpack.name);
    await inventoryPage.expectItemDisplayedInList(bikeLight.name);
    await checkoutStepTwoPage.moveToCheckoutCompletePage();
    await completePage.expectCompleteInfoIsCorrect();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
