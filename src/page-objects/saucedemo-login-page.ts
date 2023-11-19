import { expect, Page } from '@playwright/test';

export default class LoginPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------
  USER_NAME_INPUT = '[data-test="username"]';
  PASSWORD_INPUT = '[data-test="password"]';
  LOGIN_BUTTON = '[data-test="login-button"]';
  ERROR_MESSAGE = '[data-test="error"]';
  titleText = 'Swag Labs';
  lockedUserErrorText = 'Epic sadface: Sorry, this user has been locked out.';
  notExistingUserErrorText =
    'Epic sadface: Username and password do not match any user in this service';
  requiredUsernameErrorText = 'Epic sadface: Username is required';
  requiredPasswordErrorText = 'Epic sadface: Password is required';

  // Actions
  //-------------------------------------------------------
  public async fillUsername(username: string) {
    await this.page.locator(this.USER_NAME_INPUT).fill(username);
  }

  public async fillPassword(password: string) {
    await this.page.locator(this.PASSWORD_INPUT).fill(password);
  }

  public async submitLogin() {
    await this.page.locator(this.LOGIN_BUTTON).click();
  }

  public async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();
  }

  // Asserts
  //-------------------------------------------------------
  public async expectTitleCorrect() {
    await expect(this.page).toHaveTitle(this.titleText);
  }

  public async expectErrorVisible() {
    await expect(this.page.locator(this.ERROR_MESSAGE)).toBeVisible();
  }

  public async expectLockedUserMessageCorrect() {
    await expect(this.page.locator(this.ERROR_MESSAGE)).toHaveText(
      this.lockedUserErrorText
    );
  }

  public async expectNotExistingUserMessageCorrect() {
    await expect(this.page.locator(this.ERROR_MESSAGE)).toHaveText(
      this.notExistingUserErrorText
    );
  }

  public async expectRequiredUsernameMessageCorrect() {
    await expect(this.page.locator(this.ERROR_MESSAGE)).toHaveText(
      this.requiredUsernameErrorText
    );
  }

  public async expectRequiredPasswordMessageCorrect() {
    await expect(this.page.locator(this.ERROR_MESSAGE)).toHaveText(
      this.requiredPasswordErrorText
    );
  }
}
