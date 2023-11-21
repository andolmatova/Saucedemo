import { expect, type Page } from '@playwright/test';

export default class CheckoutStepTwoPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  FINISH_BUTTON = '[data-test="finish"]';
  completeTitle = 'Checkout: Complete!';
  completeUrl = 'https://www.saucedemo.com/checkout-complete.html';

  // Actions
  //-------------------------------------------------------

  public async moveToCheckoutCompletePage() {
    await this.page.locator(this.FINISH_BUTTON).click();
    await expect(this.page.getByText(this.completeTitle)).toBeVisible();
    await expect(this.page).toHaveURL(this.completeUrl);
  }
}
