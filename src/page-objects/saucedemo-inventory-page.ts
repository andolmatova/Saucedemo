import { expect, type Page } from '@playwright/test';

export default class InventoryPage {
  constructor(protected readonly page: Page) {}

  // Elements
  //-------------------------------------------------------

  // Actions
  //-------------------------------------------------------
  public async expectInventoryPageOpened() {
    await expect(this.page.getByText('Products')).toBeVisible();
  }
}
