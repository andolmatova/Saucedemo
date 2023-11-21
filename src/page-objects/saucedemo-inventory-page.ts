import { expect, type Page } from '@playwright/test';

export default class InventoryPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  BURGER_MENU_BTN = '#react-burger-menu-btn';
  HEADER_LOGO = '.app_logo';
  SCND_HEADER = '#header_container > div.header_secondary_container > span';
  SHOPPING_CART_LINK = '#shopping_cart_container';
  SORT_DROPDOWN = '[data-test="product_sort_container"]';
  BACKPACK = 'sauce-labs-backpack';
  BOLT_SHIRT = 'sauce-labs-bolt-t-shirt';
  ONESIE = 'sauce-labs-onesie';
  BIKE_LIGHT = 'sauce-labs-bike-light';
  FLEECE_JACKET = 'sauce-labs-fleece-jacket';
  TEST_ALL = 'test.allthethings()-t-shirt-(red)';
  cartUrl = 'https://www.saucedemo.com/cart.html';

  // Actions
  //-------------------------------------------------------

  public async expectInventoryPageOpened() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }

  public async moveToCart() {
    await this.page.locator(this.SHOPPING_CART_LINK).click();
    await expect(this.page.locator(this.SCND_HEADER)).toBeVisible();
    await expect(this.page).toHaveURL(this.cartUrl);
  }

  /**
   * Добавление товара в корзину.
   * @param {string} itemName Имя товара.
   */
  public async addProductToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
    await expect(
      this.page.locator(`[data-test="remove-${itemName}"]`)
    ).toBeVisible();
  }

  /**
   * Удаление товара из корзины.
   * @param page Параметр страницы, 'invPage' - inventory page, 'cartPage' - cart page.
   */
  public async removeProductFromCart(
    itemName: string,
    page: 'invPage' | 'cartPage'
  ) {
    if (page === 'invPage') {
      await this.page.locator(`[data-test="remove-${itemName}"]`).click();
      await expect(
        this.page.locator(`[data-test="add-to-cart-${itemName}"]`)
      ).toBeVisible();
    } else {
      await this.page.locator(`[data-test="remove-${itemName}"]`).click();
      await expect(
        this.page.locator(`[data-test="remove-${itemName}"]`)
      ).toBeHidden();
    }
  }

  // Asserts
  //-------------------------------------------------------

  /**
   * Проверка отображения товара в списке.
   */
  public async expectItemDisplayedInList(itemName: string) {
    await expect(this.page.getByRole('link', { name: itemName })).toBeVisible();
  }

  /**
   * Проверка отображения товаров в значке корзины.
   * @param cartState Состояние корзины, full - товары добавлены, empty - товары удалены.
   */
  public async expectProductNumberIsCorrect(cartState: 'full' | 'empty') {
    if (cartState === 'full') {
      await expect(this.page.locator(this.SHOPPING_CART_LINK)).toHaveText('6');
    } else {
      await expect(this.page.locator(this.SHOPPING_CART_LINK)).toHaveText('');
    }
  }
}
