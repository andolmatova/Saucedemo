import { expect, type Page } from '@playwright/test';

export default class CartPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  CHECKOUT_BUTTON = '[data-test="checkout"]';

  // Actions
  //-------------------------------------------------------

  public async moveToCheckoutStepOnePage() {
    await this.page.locator(this.CHECKOUT_BUTTON).click();
    await expect(
      this.page.getByText('Checkout: Your Information')
    ).toBeVisible();
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-step-one.html'
    );
  }

  /**
   * Проверка отображения товара.
   */
  public async expectItemDisplayedInList(itemName: string) {
    await expect(this.page.getByRole('link', { name: itemName })).toBeVisible();
  }
}
