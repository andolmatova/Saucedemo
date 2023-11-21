import { expect, type Page } from '@playwright/test';

export default class CompletePage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  COMPLETE_HEADER = '.complete-header';
  COMPLETE_TEXT = '.complete-text';
  PONY_EXPRESS = '.pony_express';
  BACK_TO_PRODUCTS_BTN = '[data-test="back-to-products"]';
  thankYouText = 'Thank you for your order!';
  yourOrderText =
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

  // Actions
  //-------------------------------------------------------

  public async expectCompleteInfoIsCorrect() {
    await expect(this.page.locator(this.COMPLETE_HEADER)).toBeVisible();
    await expect(this.page.locator(this.COMPLETE_HEADER)).toHaveText(
      this.thankYouText
    );
    await expect(this.page.locator(this.COMPLETE_TEXT)).toBeVisible();
    await expect(this.page.locator(this.COMPLETE_TEXT)).toHaveText(
      this.yourOrderText
    );
    await expect(this.page.locator(this.PONY_EXPRESS)).toHaveAttribute('src');
    await expect(this.page.locator(this.BACK_TO_PRODUCTS_BTN)).toBeVisible();
  }
}
