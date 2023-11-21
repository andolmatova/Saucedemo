import { expect, type Page } from '@playwright/test';

export default class CheckoutStepOnePage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  FIRSTNAME_INPUT = '[data-test="firstName"]';
  LASTNAME_INPUT = '[data-test="lastName"]';
  POSTALCODE = '[data-test="postalCode"]';
  CONTINUE_BUTTON = '[data-test="continue"]';
  overviewTitle = 'Checkout: Overview';
  stepTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';

  // Actions
  //-------------------------------------------------------

  /**
   * Заполнение контактной информации.
   * @param {string} firstName - Имя.
   * @param {string} lastName - Фамилия.
   * @param {string} postalCode - Почтовый код.
   */
  public async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator(this.FIRSTNAME_INPUT).fill(firstName);
    await this.page.locator(this.LASTNAME_INPUT).fill(lastName);
    await this.page.locator(this.POSTALCODE).fill(postalCode);
  }

  public async moveToCheckoutStepTwoPage() {
    await this.page.locator(this.CONTINUE_BUTTON).click();
    await expect(this.page.getByText(this.overviewTitle)).toBeVisible();
    await expect(this.page).toHaveURL(this.stepTwoUrl);
  }
}
